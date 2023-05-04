const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  mobile: state => state.user.mobile,
  departments: state => state.user.departments,
  userId: state => state.user.userId,
  dutytype: state => state.user.dutytype,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  addHorizontalRouters: state => state.permission.addHorizontalRouters,
  permission: state => state.permission.permission,
  multiTab: state => state.app.multiTab
}

export default getters
