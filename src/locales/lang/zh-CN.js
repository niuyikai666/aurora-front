import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-hk'
import moment from 'moment'
moment.updateLocale('zh-hk', {
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
            return number + '日'
        case 'M':
            return number + '月'
        case 'w':
        case 'W':
            return number + '周'
        default:
            return number
    }
  }
})
antd.locale = 'zh-hk'
const components = {
  antLocale: antd,
  momentName: 'zh-hk',
  momentLocale: momentCN
}
const locale = {
  'message': '-',
  'menu.home': '主页',

  'menu.structure': '组织架构管理',

  'menu.admin': '管理员管理',
  'menu.admin.system': '系统管理员',
  'menu.admin.super': '超级管理员',
  'menu.admin.department': '部门管理员',
  'menu.admin.ordinary': '管理员',

  'menu.artist': '艺人管理', // 艺人后后台
  'menu.artist-freedom': '无运营主播管理',
  'menu.artist.apply': '申请认领主播',

  'menu.examine': '主播认领审核',

  'menu.agent': '公会经纪人管理',

  'menu.log': '操作日志',

  'menu.workplace': '工作台',
  'menu.artists': '艺人列表',
  'menu.contract': '合同管理',
  'menu.data-report': '数据报表',
  'menu.no-data-report': '无运营艺人报表',

  'layouts.usermenu.dialog.title': '提示',
  'layouts.usermenu.dialog.content': '确定要退出吗？'
}

export default {
  ...components,
  ...locale
}
