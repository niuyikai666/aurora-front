import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'
import { getQueryParam, timeFix } from '@/utils/util'
import { getUserInfo } from '@/api/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/'

router.beforeEach(async (to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // check login user.roles is null
      if (store.getters.nickname) {
        next()
      } else {
        // request login userInfo
       await store
          .dispatch('GetInfo')
          .then(() => {
            // get page permission
            store.dispatch('GetPageOperation')
            // generate dynamic router
            store.dispatch('GenerateRoutes').then(() => {
              // 动态添加纵向菜单
              router.addRoutes(store.getters.addRouters)
              // 动态添加水平菜单
              router.addRoutes(store.getters.addHorizontalRouters)
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              // const redirect = decodeURIComponent(from.query.redirect || to.path)
              const redirect = decodeURIComponent(to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout')
          })
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }

    // 飞书单点登录
    const uid = getQueryParam('uid')
    if (uid) {
      getUserInfo(uid).then(res => {
        store.dispatch('LoginFeishu', res).then(() => {
          next({ path: '/' })
          setTimeout(() => {
            notification.success({
              message: '欢迎',
              description: `${timeFix()}，欢迎回来`
            })
          }, 1000)
        })
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
