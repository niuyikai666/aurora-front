import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, USER_INFO, PERMISSIONCODES } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import router from '@/router'

function setInfo (result) {
  storage.set(USER_INFO, JSON.stringify(result), 7 * 24 * 60 * 60 * 1000)
  storage.set(ACCESS_TOKEN, `${result.id}`, 7 * 24 * 60 * 60 * 1000)
  storage.set(PERMISSIONCODES, JSON.stringify(result.permissionCodes), 7 * 24 * 60 * 60 * 1000)
}

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    mobile: '',
    dutytype: '',
    welcome: '',
    departments: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, { name, mobile, avatar, dutytype, welcome, userId }) => {
      state.name = name
      state.mobile = mobile
      state.avatar = avatar
      state.dutytype = dutytype
      state.welcome = welcome
      state.userId = userId
    },
    SET_DEPARTMENTS: (state, departments) => {
      state.departments = departments
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(result => {
          setInfo(result)
          commit('SET_TOKEN', `${result.id}`)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    LoginQrcode ({ commit }, result) {
      return new Promise((resolve) => {
        setInfo(result)
        commit('SET_TOKEN', `${result.id}`)
        resolve()
      })
    },

    LoginFeishu ({ commit }, result) {
      return new Promise((resolve) => {
        setInfo(result)
        commit('SET_TOKEN', `${result.id}`)
        resolve()
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          commit('SET_INFO', {
            name: res.name,
            mobile: res.mobile,
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            dutytype: res.dutyType.code,
            welcome: welcome(),
            userId: res.id
          })
          commit('SET_DEPARTMENTS', res.departmentFullName || '')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout().then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_TOKEN', '')
          storage.remove(ACCESS_TOKEN)
          storage.remove(USER_INFO)
          router.push(`/user/login`)
          location.reload()
          resolve()
        })
      })
    }
  }
}

export default user
