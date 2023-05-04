import { asyncRouterMapVertical, asyncRouterMapHorizontal, constantRouterMap } from '@/config/router.config'
import { PERMISSIONCODES } from '@/store/mutation-types'
import storage from 'store'
// import { getMenusMine } from '@/api/permission'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.permission) {
    return roles.some(role => route.meta.permission.includes(role))
  } else {
    return true
  }
}

/**
 *
 * @param {arr} clientAsyncRoutes 前端保存动态路由
 * @param {arr} serverRouter 后端保存动态路由
 */
// function makePermissionRouters (serverRouter, clientAsyncRoutes) {
//   clientAsyncRoutes.map(ele => {
//     if (!ele.name || (!ele.meta && !ele.meta.permission)) return
//     for (let i = 0; i < serverRouter.length; i++) {
//       const element = serverRouter[i]
//       if (ele.path === element.path) {
//         ele.meta.permission = ['roles']
//         // ele.meta.title = element.name
//       }
//     }

//     if (ele.children) {
//       makePermissionRouters(serverRouter, ele.children)
//     }
//   })
//   return clientAsyncRoutes
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// function createMenuByDirection (serveRoutes) {
//   return {
//     routesVertical: serveRoutes.filter(route => route && route.position.code === 1),
//     routesHorizontal: serveRoutes.filter(route => route && route.position.code === 2)
//   }
// }

// // 设置每个父级路由的重定向
// function setRouteItemRedirect (routes) {
//   routes.forEach(item => {
//     if (item.children && item.children.length) {
//       item.redirect = item.children[0].path
//     }
//   })

//   return routes
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    addHorizontalRouters: [],
    permission: {}
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers.vertical
      state.addHorizontalRouters = routers.horizontal
      state.routers = constantRouterMap.concat(routers)
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission
    }
  },
  actions: {
    GenerateRoutes ({ commit }) {
      return new Promise(resolve => {
        // getMenusMine().then(res => {
        //   const { routesVertical, routesHorizontal } = createMenuByDirection(res)
        //   // permission纵向菜单
        //   const permissionRoutesVertical = makePermissionRouters(routesVertical, asyncRouterMapVertical)
        //   const accessedRoutesVertical = filterAsyncRoutes(permissionRoutesVertical, ['roles'])
        //   // permission横向菜单
        //   const permissionRoutesHorizontal = makePermissionRouters(routesHorizontal, asyncRouterMapHorizontal)
        //   const accessedRoutesHorizontal = filterAsyncRoutes(permissionRoutesHorizontal, ['roles'])

        //   accessedRoutesVertical[0].children = setRouteItemRedirect(accessedRoutesVertical[0].children)

        //   const routesV = accessedRoutesVertical
        //   const routesH = setRouteItemRedirect(accessedRoutesHorizontal)

        //   routesV[0].redirect = routesH[0].path

        //   commit('SET_ROUTERS', {
        //     vertical: routesV,
        //     horizontal: routesH
        //   })
        //   resolve()
        // })
        commit('SET_ROUTERS', {
          vertical: asyncRouterMapVertical,
          horizontal: asyncRouterMapHorizontal
        })
        resolve()
      })
    },
    // 获取页面权限 permisson.js中也要解开注释
    GetPageOperation ({ commit }) {
      const res = JSON.parse(storage.get(PERMISSIONCODES))
      commit('SET_PERMISSION', res)
    }
  }
}

export default permission
