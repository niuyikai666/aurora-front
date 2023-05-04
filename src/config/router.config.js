import { UserLayout, BasicLayout, TopLayout, BlankLayout } from '@/layouts'
// import { solution, feedback } from '@/core/icons'
import {
  solution,
  chart,
  file,
  task,
  system,
  dashboard,
  taskGroup,
  score,
  company,
  contract,
  report,
  artistTiktok,
  taskIcon,
  taskManageIcon,
  commission
} from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMapVertical = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '主页' },
    redirect: '/report',
    children: [
      // 首页
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: (resolve) => require(['@/views/dashboard/index'], resolve),
        meta: { title: '工作台', icon: dashboard }
      },

      // 报表
      {
        path: '/report',
        name: 'Report',
        component: RouteView,
        redirect: '/report/list-live',
        meta: { title: '数据报表', icon: chart, permission: ['report'] },
        children: [
          {
            path: '/report/core',
            name: 'report-core',
            component: (resolve) => require(['@/views/report/core'], resolve),
            meta: {
              title: '核心数据分析',
              keepAlive: false,
              permission: ['report-core']
            }
          },
          {
            path: '/report/list-live',
            name: 'report-list-live',
            component: (resolve) =>
              require(['@/views/report/list-live'], resolve),
            meta: {
              title: '数据报表-直播',
              keepAlive: false,
              permission: ['report-live']
            }
          },
          {
            path: '/report/list-short',
            name: 'report-list-short',
            component: (resolve) =>
              require(['@/views/report/list-short'], resolve),
            meta: {
              title: '数据报表-短视频',
              keepAlive: false,
              permission: ['report-short']
            }
          },
          {
            path: '/report/live-detail',
            name: 'report-live-detail',
            component: (resolve) =>
              require(['@/views/report/report-live/index'], resolve),
            meta: {
              title: '抖音数据明细',
              keepAlive: false,
              permission: ['report-live-detail']
            }
          },
          // {
          //   path: '/report/live/operate',
          //   name: 'report-live-operate',
          //   component: (resolve) =>
          //     require(['@/views/report/report-live/operate'], resolve),
          //   meta: {
          //     title: '直播数据明细-运营',
          //     keepAlive: false,
          //     permission: ['report-live-operate']
          //   }
          // },
          // {
          //   path: '/report/live/manage',
          //   name: 'report-live-manage',
          //   component: (resolve) =>
          //     require(['@/views/report/report-live/manage'], resolve),
          //   meta: {
          //     title: '直播数据明细-管理层',
          //     keepAlive: false,
          //     permission: ['report-live-mamage']
          //   }
          // },
          {
            path: '/report/video-data',
            name: 'report-video-data',
            component: (resolve) =>
              require(['@/views/video-data/index'], resolve),
            meta: {
              title: '视频号数据明细',
              keepAlive: false,
              permission: ['report-video-data']
            }
          }
        ]
      },

      // 主播管理-抖音
      {
        path: '/artists',
        name: 'Artists',
        component: RouteView,
        redirect: '/artists/list-live',
        meta: {
          title: '主播管理【抖音】',
          icon: artistTiktok,
          permission: ['artists']
        },
        children: [
          {
            path: '/artists/list-live',
            name: 'artist-list-live',
            component: (resolve) =>
              require(['@/views/artists/list-live/index'], resolve),
            meta: {
              title: '主播列表',
              keepAlive: false,
              permission: ['aritists-live']
            }
          },
          // {
          //   path: '/artists/list-video',
          //   name: 'artist-list-video',
          //   component: (resolve) => require(['@/views/artists/list-video/index'], resolve),
          //   meta: { title: '主播列表-视频号', keepAlive: false, permission: [ 'artists-video' ] }
          // },
          {
            path: '/artists/list-operate',
            name: 'artist-list-operate',
            component: (resolve) =>
              require(['@/views/artists/list-operate/index'], resolve),
            meta: {
              title: '我的主播',
              keepAlive: false,
              permission: ['aritists-operate']
            }
          },
          {
            path: '/artists/search',
            name: 'artist-search',
            component: (resolve) =>
              require(['@/views/artists/artist-search/index'], resolve),
            meta: {
              title: '主播查询',
              keepAlive: false,
              permission: ['aritists-search']
            }
          },
          {
            path: '/artists/relation',
            name: 'Relation',
            component: RouteView,
            redirect: '/artists/relation/index',
            meta: { title: '主播关系填写', permission: ['aritists-relation'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/artists/relation/index',
                name: 'RelationIndex',
                hidden: true,
                component: (resolve) =>
                  require(['@/views/artists/artist-relation/index'], resolve),
                meta: { title: '搜索' }
              },
              {
                path: '/artists/relation/detail',
                name: 'RelationDetail',
                hidden: true,
                component: (resolve) =>
                  require(['@/views/artists/artist-relation/detail'], resolve),
                meta: { title: '金数据详情' }
              },
              {
                path: '/artists/relation/active',
                name: 'active-apply-actived',
                component: (resolve) =>
                  require(['@/views/artists/artist-relation/active'], resolve),
                meta: { title: '激活申请' },
                hidden: true
              }
            ]
          },
          {
            path: '/artists/relation-manage',
            name: 'RelationManage',
            component: BlankLayout,
            redirect: '/artists/relation-manage/index',
            meta: {
              title: '主播关系管理',
              keepAlive: true,
              permission: ['relation-manage']
            },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/artists/relation-manage/index',
                name: 'RelationManageIndex',
                hidden: true,
                component: (resolve) =>
                  require(['@/views/artists/relation-manage/index'], resolve),
                meta: { title: '列表', keepAlive: true }
              },
              {
                path: '/artists/relation-manage/gold',
                name: 'RelationManageGold',
                hidden: true,
                component: (resolve) =>
                  require(['@/views/artists/gold'], resolve),
                meta: { title: '金数据填写' }
              },
              {
                path: '/artists/relation-manage/goldDetail',
                name: 'RelationManageGoldDetail',
                hidden: true,
                component: (resolve) =>
                  require(['@/views/artists/goldDetail'], resolve),
                meta: { title: '金数据详情' }
              }
            ]
          },
          {
            path: '/artists/gold',
            name: 'Gold',
            component: RouteView,
            redirect: '/artists/gold/list',
            meta: { title: '主播信息补全', permission: ['gold'] },
            hideChildrenInMenu: true,
            icon: 'solution',
            children: [
              {
                path: '/artists/gold/list',
                name: 'gold-list',
                component: (resolve) => require(['@/views/gold/List'], resolve),
                meta: { title: '主播列表' },
                hidden: true
              },
              {
                path: '/artists/gold/business-detail',
                name: 'business-detail',
                component: (resolve) =>
                  require(['@/views/gold/business-detail'], resolve),
                meta: { title: '主播详情-运营关系' },
                hidden: true
              },
              {
                path: '/artists/gold/short-media',
                name: 'short-media',
                component: (resolve) =>
                  require(['@/views/gold/short-media'], resolve),
                meta: { title: '主播详情-短视频' },
                hidden: true
              },
              {
                path: '/artists/gold/relation-list',
                name: 'relation-list',
                component: (resolve) =>
                  require(['@/views/gold/relation-list'], resolve),
                meta: { title: '修改记录' },
                hidden: true
              }
            ]
          },
          {
            path: '/artists/actived',
            name: 'artist-actived',
            redirect: '/artists/actived/list',
            meta: {
              title: '主播激活管理',
              keepAlive: false,
              permission: ['aritists-actived']
            },
            component: RouteView,
            hideChildrenInMenu: true,
            children: [
              {
                path: '/artists/actived/list',
                name: 'artist-actived-list',
                component: (resolve) =>
                  require(['@/views/artists/actived/index'], resolve),
                meta: { title: '列表' },
                hidden: true
              }
            ]
          },
          // {
          //   path: '/artists/artists-cutoff',
          //   name: 'artist-cutoff',
          //   component: (resolve) => require(['@/views/artists/artists-cutoff/index'], resolve),
          //   meta: { title: '复播主播', keepAlive: false, permission: [ 'aritists-cutoff' ] }
          // },
          {
            path: '/artists/detail',
            name: 'art-detail',
            component: (resolve) =>
              require(['@/views/artists/detail'], resolve),
            meta: { title: '艺人详情' },
            hidden: true
          }
        ]
      },
      // 主播管理-视频号
      {
        path: '/artists-video',
        name: 'ArtistsVideo',
        component: RouteView,
        redirect: '/artists-video/list-video',
        meta: {
          title: '主播管理【视频号】',
          icon: file,
          permission: ['artists-video']
        },
        children: [
          {
            path: '/artists-video/list-video',
            name: 'artists-video-live',
            component: (resolve) =>
              require(['@/views/artists-video/list-video/index'], resolve),
            meta: {
              title: '主播列表',
              keepAlive: false,
              permission: ['artists-video-live']
            }
          },
          {
            path: '/artists-video/my-video',
            name: 'artists-my-video',
            component: (resolve) =>
              require(['@/views/artists-video/my-video/index'], resolve),
            meta: {
              title: '我的主播',
              keepAlive: false,
              permission: ['artists-my-video']
            }
          },
          {
            path: '/artists-video/relation-manage',
            redirect: '/artists-video/relation-manage/index',
            name: 'artists-relation-manage',
            component: RouteView,
            meta: {
              title: '主播关系管理',
              keepAlive: false,
              permission: ['artists-relation-manage']
            },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/artists-video/relation-manage/index',
                name: 'artists-relation-manage-index',
                component: (resolve) =>
                  require([
                    '@/views/artists-video/relation-manage/index'
                  ], resolve),
                meta: { title: '主播关系管理 ', keepAlive: false }
              },
              {
                path: '/artists-video/relation-manage/add',
                name: 'artists-relation-manage-add',
                component: (resolve) =>
                  require(['@/views/artists-video/add'], resolve),
                meta: { title: '主播信息填写 ', keepAlive: false }
              }
            ]
          },
          {
            path: '/artists-video/completion',
            redirect: '/artists-video/completion/index',
            name: 'artists-completion',
            component: RouteView,
            meta: {
              title: '主播信息补全',
              keepAlive: false,
              permission: ['artists-video-completion']
            },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/artists-video/completion/index',
                name: 'artists-completion-index',
                component: (resolve) =>
                  require(['@/views/artists-video/completion/index'], resolve),
                meta: { title: '列表 ', keepAlive: false }
              },
              {
                path: '/artists-video/completion/record',
                name: 'artists-completion-record',
                component: (resolve) =>
                  require(['@/views/artists-video/completion/record'], resolve),
                meta: { title: '关系修改记录 ', keepAlive: false }
              }
            ]
          },
          {
            path: '/artists-video/detail',
            name: 'artists-video-detail',
            component: (resolve) =>
              require(['@/views/artists-video/detail'], resolve),
            meta: { title: '艺人详情' },
            hidden: true
          }
          // ,
          // {
          //   path: '/artists/list-operate',
          //   name: 'artist-list-operate',
          //   component: (resolve) => require(['@/views/artists/list-operate/index'], resolve),
          //   meta: { title: '我的主播', keepAlive: false, permission: [ 'aritists-operate' ] }
          // }
        ]
      },

      // 主播任务列表
      {
        path: '/task-anchor',
        component: RouteView,
        redirect: '/task-anchor/operate',
        name: 'TaskAnchor',
        meta: {
          title: '主播任务列表',
          icon: taskIcon,
          permission: ['task-anchor']
        },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/task-anchor/operate',
            name: 'TaskAnchorOperate',
            component: (resolve) =>
              require(['@/views/task-anchor/plan/operate'], resolve),
            meta: { title: '运营', permission: ['task-anchor-operate'] }
          },
          {
            path: '/task-anchor/manage',
            name: 'TaskAnchorManage',
            component: (resolve) =>
              require(['@/views/task-anchor/plan/list'], resolve),
            meta: { title: '管理', permission: ['task-anchor-manage'] }
          }
        ]
      },

      // 主播任务管理
      {
        path: '/task-anchor-backstage',
        component: (resolve) =>
          require(['@/views/task-anchor/backstage/manage'], resolve),
        name: 'TaskAnchorBackstage',
        meta: {
          title: '主播任务管理',
          icon: taskManageIcon,
          permission: ['task-anchor-backstage']
        }
      },

      // 主播任务规则管理
      {
        path: '/task-anchor-rule',
        component: (resolve) =>
          require(['@/views/task-anchor/rule/index'], resolve),
        name: 'TaskAnchorRule',
        meta: {
          title: '任务规则管理',
          icon: taskManageIcon,
          permission: ['task-anchor-rule']
        }
      },

      // 视频宫格运营提报比例
      {
        path: '/task-squared-proportion',
        component: (resolve) =>
          require(['@/views/task-team/squared-proportion/index'], resolve),
        name: 'SquaredProportion',
        meta: {
          title: '视频宫格运营提报比例',
          icon: taskManageIcon,
          permission: ['task-squared-proportion']
        }
      },
      {
        path: '/global-data',
        component: (resolve) => require(['@/views/global-data/index'], resolve),
        name: 'GlobalData',
        meta: {
          title: '全局数据管理',
          icon: taskManageIcon,
          permission: ['global-data']
        }
      },
      // 主播任务管理
      // {
      //   path: '/task-anchor-manage',
      //   component: RouteView,
      //   redirect: '/task-anchor-manage/list',
      //   name: 'TaskAnchorManage',
      //   meta: { title: '主播任务管理', icon: task, permission: [ 'task-anchor-manage' ] },
      //   // hideChildrenInMenu: true,
      //   children: [
      //     {
      //       path: '/task-anchor-manage/list',
      //       name: 'TaskAnchorManageList',
      //       component: (resolve) => require(['@/views/task-anchor/backstage/list'], resolve),
      //       meta: { title: '任务列表', permission: [ 'task-anchor-manage-list' ] }
      //     },
      //     {
      //       path: '/task-anchor-manage/manage',
      //       name: 'TaskAnchorManageStage',
      //       component: (resolve) => require(['@/views/task-anchor/backstage/manage'], resolve),
      //       meta: { title: '后台管理', permission: [ 'task-anchor-manage-manage' ] }
      //     }
      //   ]
      // },

      // 拉新任务
      {
        path: '/task-new',
        component: RouteView,
        redirect: '/task-new/operate',
        name: 'TaskNew',
        meta: {
          title: '拉新任务',
          icon: task,
          keepAlive: false,
          permission: ['task-new']
        },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/task-new/operate',
            name: 'TaskNewOperate',
            component: (resolve) =>
              require(['@/views/task-new/operate'], resolve),
            meta: { title: '运营', permission: ['task-new-operate'] }
          },
          {
            path: '/task-new/group',
            name: 'TaskNewGroup',
            redirect: '/task-new/group/list',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: { title: '小组', permission: ['task-new-group'] },
            children: [
              {
                path: '/task-new/group/list',
                name: 'TaskNewGroupList',
                component: (resolve) =>
                  require(['@/views/task-new/group'], resolve),
                meta: { title: '概览' }
              },
              {
                path: '/task-new/group/reward',
                name: 'TaskNewGroupReward',
                component: (resolve) =>
                  require(['@/views/task-new/reward'], resolve),
                meta: { title: '提成明细' }
              },
              {
                path: '/task-new/group/reward-account',
                name: 'TaskNewGroupRewardAccount',
                component: (resolve) =>
                  require(['@/views/task-new/reward-account'], resolve),
                meta: { title: '负责人核算流水' }
              }
            ]
          },
          {
            path: '/task-new/company',
            name: 'TaskNewCompany',
            redirect: '/task-new/company/list',
            component: RouteView,
            meta: { title: '分公司', permission: ['task-new-company'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/task-new/company/list',
                name: 'TaskNewCompanyList',
                component: (resolve) =>
                  require(['@/views/task-new/company'], resolve),
                meta: { title: '概览' }
              },
              {
                path: '/task-new/company/reward',
                name: 'TaskNewCompanyReward',
                component: (resolve) =>
                  require(['@/views/task-new/reward'], resolve),
                meta: { title: '提成明细' }
              },
              {
                path: '/task-new/company/reward-account',
                name: 'TaskNewCompanyRewardAccount',
                component: (resolve) =>
                  require(['@/views/task-new/reward-account'], resolve),
                meta: { title: '负责人核算流水' }
              }
            ]
          },
          {
            path: '/task-new/backstage',
            name: 'TaskNewBackstage',
            redirect: '/task-new/backstage/list',
            component: RouteView,
            meta: { title: '总后台', permission: ['task-new-total'] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/task-new/backstage/list',
                name: 'TaskNewBackstageList',
                component: (resolve) =>
                  require(['@/views/task-new/backstage'], resolve),
                meta: { title: '概览' }
              },
              {
                path: '/task-new/backstage/reward',
                name: 'TaskNewBackstageReward',
                component: (resolve) =>
                  require(['@/views/task-new/reward-total'], resolve),
                meta: { title: '提成明细' }
              },
              {
                path: '/task-new/backstage/reward-account',
                name: 'TaskNewBackstageRewardAccount',
                component: (resolve) =>
                  require(['@/views/task-new/reward-account'], resolve),
                meta: { title: '负责人核算流水' }
              }
            ]
          }
        ]
      },

      // 小组任务
      {
        path: '/task-team',
        component: RouteView,
        redirect: '/task-team/group',
        name: 'TaskTeam',
        meta: {
          title: '管理任务',
          icon: taskGroup,
          keepAlive: false,
          permission: ['task-team']
        },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/task-team/operate',
            name: 'TaskTeamOperate',
            component: (resolve) =>
              require(['@/views/task-team/team-operate/index'], resolve),
            meta: { title: '运营', permission: ['task-team-operate'] }
          },
          {
            path: '/task-team/group',
            name: 'TaskTeamGroup',
            component: (resolve) =>
              require(['@/views/task-team/team-group/index'], resolve),
            meta: { title: '组长', permission: ['task-team-group'] }
          },
          {
            path: '/task-team/company',
            name: 'TaskTeamCompany',
            component: (resolve) =>
              require(['@/views/task-team/team-company/index'], resolve),
            meta: { title: '分公司', permission: ['task-team-company'] }
          },
          {
            path: '/task-team/backstage',
            name: 'TaskTeamBackstage',
            component: (resolve) =>
              require(['@/views/task-team/team-backstage/index'], resolve),
            meta: { title: '总后台', permission: ['task-team-backstage'] }
          },
          {
            path: '/task-team/rule',
            name: 'TaskTeamRule',
            component: (resolve) =>
              require(['@/views/task-team/rule'], resolve),
            meta: { title: '规则配置', permission: ['task-team-rule'] }
          }
        ]
      },
      {
        path: '/commission',
        component: RouteView,
        redirect: '/commission/settle',
        name: 'Commission',
        meta: {
          title: '提成管理',
          icon: commission,
          keepAlive: false,
          permission: ['commission']
        },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/commission/operate',
            name: 'CommissionOperate',
            component: (resolve) =>
              require(['@/views/commission/operate/index'], resolve),
            meta: {
              title: '运营',
              permission: ['commission-operate']
            }
          },
          {
            path: '/commission/group',
            name: 'CommissionGroup',
            component: (resolve) =>
              require(['@/views/commission/group/index'], resolve),
            meta: {
              title: '小组',
              permission: ['commission-group']
            }
          },
          {
            path: '/commission/company',
            name: 'CommissionCompany',
            component: (resolve) =>
              require(['@/views/commission/company/index'], resolve),
            meta: {
              title: '分公司',
              permission: ['commission-company']
            }
          },
          {
            path: '/commission/backstage',
            name: 'CommissionBackstage',
            component: (resolve) =>
              require(['@/views/commission/backstage/index'], resolve),
            meta: {
              title: '总后台',
              permission: ['commission-backstage']
            }
          },
          {
            path: '/commission/settle',
            name: 'CommissionSettle',
            component: (resolve) =>
              require(['@/views/commission/settle/index'], resolve),
            meta: {
              title: '结算关系核对【抖音】',
              permission: ['commission-settle']
            }
          }
        ]
      },
      {
        path: '/commission-video',
        component: RouteView,
        redirect: '/commission/settle',
        name: 'Commission',
        meta: {
          title: '提成管理【视频号】',
          icon: commission,
          keepAlive: false,
          permission: ['commission-video']
        },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/commission-video/influencer-task',
            name: 'CommissionInfluencerTask',
            component: (resolve) =>
              require([
                '@/views/commission-video/influencer-task/index'
              ], resolve),
            meta: {
              title: '主播任务列表',
              permission: ['influencer-task']
            }
          },
          {
            path: '/commission-video/data-manage',
            name: 'CommissionDataManage',
            component: (resolve) =>
              require(['@/views/commission-video/data-manage/index'], resolve),
            meta: {
              title: '数据管理',
              permission: ['data-manage']
            }
          },
          {
            path: '/commission-video/rule',
            name: 'CommissionRule',
            component: (resolve) =>
              require(['@/views/commission-video/rule/index'], resolve),
            meta: {
              title: '提成规则管理',
              permission: ['commission-rule']
            }
          }
        ]
      },
      // 主播查询
      // {
      //   path: '/artists-operation',
      //   name: 'ArtistsOperation',
      //   component: RouteView,
      //   redirect: '/artists/list-live',
      //   meta: { title: '主播查询', icon: search, permission: [ 'artists-operation' ] },
      //   children: [
      //     {
      //       path: '/artists-operation/artist-search',
      //       name: 'artists-operation-search',
      //       component: (resolve) => require(['@/views/artists/artist-search/index'], resolve),
      //       meta: { title: '主播查询', permission: [ 'artists-search' ] }
      //     },
      //     {
      //       path: '/artists-operation/gold-data',
      //       name: 'GoldData',
      //       component: RouteView,
      //       redirect: '/artists-operation/gold-data/workplace',
      //       meta: { title: '主播关系填写', permission: [ 'gold-data' ] },
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/artists-operation/gold-data/workplace',
      //           name: 'GoldDataIndex',
      //           hidden: true,
      //           component: (resolve) => require(['@/views/gold-data/index'], resolve),
      //           meta: { title: '搜索' }
      //         },
      //         {
      //           path: '/artists-operation/gold-data/detail',
      //           name: 'GoldDataDetail',
      //           hidden: true,
      //           component: (resolve) => require(['@/views/gold-data/detail'], resolve),
      //           meta: { title: '金数据详情' }
      //         },
      //         {
      //           path: '/artists-operation/gold-data/active',
      //           name: 'active-apply-actived',
      //           component: (resolve) => require(['@/views/active-apply/active'], resolve),
      //           meta: { title: '激活申请' },
      //           hidden: true
      //         }
      //       ]
      //     },
      //     {
      //       path: '/artists-operation/artists-cutoff/list',
      //       name: 'artist-cutoff-list',
      //       component: (resolve) => require(['@/views/artists-cutoff/list'], resolve),
      //       meta: { title: '断播主播查询', keepAlive: false, permission: [ 'artists-cutoff-list' ] }
      //     },
      //     {
      //       path: '/artists-operation/artists-cutoff/actived',
      //       name: 'artist-cutoff-list-active',
      //       component: (resolve) => require(['@/views/artists-cutoff/list-active'], resolve),
      //       meta: { title: '复播主播', keepAlive: false, permission: [ 'artists-cutoff-actived' ] }
      //     },
      //     {
      //       path: '/artists-operation/artist-freedom',
      //       name: 'ArtistFreedom',
      //       component: (resolve) => require(['@/views/artist/Freedom'], resolve),
      //       meta: { title: '无运营主播', keepAlive: false, permission: [ 'artist-freedom' ] }
      //     },
      //     {
      //       path: '/artists-operation/active-apply',
      //       name: 'ActiveApply',
      //       component: TopLayout,
      //       redirect: '/artists-operation/active-apply/apply',
      //       meta: { title: '激活申请' },
      //       hideChildrenInMenu: true,
      //       hidden: true,
      //       children: [
      //         {
      //           path: '/artists-operation/active-apply/apply',
      //           name: 'active-apply-do',
      //           component: (resolve) => require(['@/views/active-apply/apply'], resolve),
      //           meta: { title: '激活申请', keepAlive: false },
      //           hidden: true
      //         }
      //       ]
      //     }
      //   ]
      // },

      // 合同管理
      {
        path: '/contract',
        component: RouteView,
        redirect: '/contract/manage',
        name: 'Contract',
        meta: {
          title: '合同管理',
          icon: contract,
          keepAlive: false,
          permission: ['contract']
        },
        children: [
          {
            path: '/contract/manage',
            name: 'ContractManage',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: {
              title: '合同列表',
              keepAlive: false,
              permission: ['contract-manage']
            },
            redirect: '/contract/manage/list',
            children: [
              {
                path: '/contract/manage/list',
                name: 'ContractManageList',
                component: (resolve) =>
                  require(['@/views/contract/manage/List'], resolve),
                meta: { title: '列表', keepAlive: false }
              },
              {
                path: '/contract/manage/create',
                name: 'ContractManageCreate',
                component: (resolve) =>
                  require(['@/views/contract/manage/Create'], resolve),
                meta: { title: '新增合同', keepAlive: false }
              },
              {
                path: '/contract/manage/edit',
                name: 'ContractManageEdit',
                component: (resolve) =>
                  require(['@/views/contract/manage/Edit'], resolve),
                meta: { title: '编辑合同', keepAlive: false }
              },
              {
                path: '/contract/manage/detail',
                name: 'ContractManageDetail',
                component: (resolve) =>
                  require(['@/views/contract/manage/Detail'], resolve),
                meta: { title: '合同详情', keepAlive: false }
              },
              {
                path: '/contract/manage/extra',
                name: 'ContractManageExtra',
                component: RouteView,
                meta: { title: '补充合同', keepAlive: false },
                hideChildrenInMenu: true,
                redirect: '/contract/manage/extra-list',
                children: [
                  {
                    path: '/contract/manage/extra-list',
                    name: 'ContractManageExtraList',
                    component: (resolve) =>
                      require(['@/views/contract/manage/extra/List'], resolve),
                    meta: { title: '列表', keepAlive: false }
                  },
                  {
                    path: '/contract/manage/extra-create',
                    name: 'ContractManageExtraCreate',
                    component: (resolve) =>
                      require([
                        '@/views/contract/manage/extra/Create'
                      ], resolve),
                    meta: { title: '新增', keepAlive: false }
                  },
                  {
                    path: '/contract/manage/extra-edit',
                    name: 'ContractManageExtraEdit',
                    component: (resolve) =>
                      require(['@/views/contract/manage/extra/Edit'], resolve),
                    meta: { title: '编辑', keepAlive: false }
                  },
                  {
                    path: '/contract/manage/extra-detail',
                    name: 'ContractManageExtraDetail',
                    component: (resolve) =>
                      require([
                        '@/views/contract/manage/extra/Detail'
                      ], resolve),
                    meta: { title: '详情', keepAlive: false }
                  }
                ]
              }
            ]
          },
          {
            path: '/contract/record',
            name: 'ContractRecord',
            component: (resolve) =>
              require(['@/views/contract/record/List'], resolve),
            meta: {
              title: '合同调取记录',
              keepAlive: false,
              permission: ['contract-record']
            }
          },
          {
            path: '/contract/extract',
            name: 'ContractExtract',
            component: (resolve) =>
              require(['@/views/contract/extract/List'], resolve),
            meta: {
              title: '合同调取',
              keepAlive: false,
              permission: ['contract-extract']
            }
          }
        ]
      },

      // 系统管理
      {
        path: '/system',
        component: RouteView,
        redirect: '/system/roles',
        name: 'System',
        meta: {
          title: '系统管理',
          icon: system,
          keepAlive: false,
          permission: ['system']
        },
        children: [
          {
            path: '/system/roles',
            name: 'Roles',
            component: (resolve) => require(['@/views/system/roles'], resolve),
            meta: {
              title: '角色管理',
              keepAlive: false,
              permission: ['system-roles']
            }
          },
          {
            path: '/system/authority',
            name: 'Authority',
            component: (resolve) =>
              require(['@/views/system/authority'], resolve),
            meta: {
              title: '权限管理',
              keepAlive: false,
              permission: ['personnel-authority']
            }
          },
          {
            path: '/system/burying-point',
            name: 'BuryingPoint',
            component: (resolve) =>
              require(['@/views/system/burying-point'], resolve),
            meta: { title: '埋点管理', permission: ['burying-point'] }
          }
        ]
      },

      // 企业管理
      {
        path: '/personnel',
        component: RouteView,
        redirect: '/personnel/structure',
        name: 'Personnel',
        meta: {
          title: '企业管理',
          icon: company,
          keepAlive: false,
          permission: ['personnel']
        },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/personnel/structure',
            name: 'StructureList',
            component: (resolve) =>
              require(['@/views/personnel/structure'], resolve),
            meta: {
              title: '组织架构管理',
              keepAlive: false,
              permission: ['personnel-structure']
            }
          },
          {
            path: '/personnel/employee',
            name: 'Employee',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: {
              title: '员工管理',
              keepAlive: false,
              permission: ['personnel-employee']
            },
            redirect: '/personnel/employee/list',
            children: [
              {
                path: '/personnel/employee/list',
                name: 'EmployeeList',
                component: (resolve) =>
                  require(['@/views/personnel/employee/list'], resolve),
                meta: { title: '员工列表', keepAlive: false }
              },
              {
                path: '/personnel/employee/create-mutiple',
                name: 'EmployeeCreateMutiple',
                component: (resolve) =>
                  require([
                    '@/views/personnel/employee/create-mutiple'
                  ], resolve),
                meta: { title: '批量添加员工', keepAlive: false }
              },
              {
                path: '/personnel/employee/detail',
                name: 'EmployeeDetail',
                component: (resolve) =>
                  require(['@/views/personnel/employee/detail'], resolve),
                meta: { title: '员工详情', keepAlive: false }
              }
            ]
          },
          {
            path: '/personnel/agent',
            name: 'Agent',
            component: (resolve) => require(['@/views/agent/index'], resolve),
            meta: {
              title: '公会经纪人管理',
              keepAlive: true,
              permission: ['agent']
            }
          },
          {
            path: '/personnel/video-admin',
            name: 'videoAdmin',
            component: (resolve) =>
              require(['@/views/personnel/video-admin/index'], resolve),
            meta: {
              title: '视频号管理员',
              keepAlive: false,
              permission: ['video-admin']
            }
          }
        ]
      },
      // 主播评分管理
      {
        path: '/score',
        component: RouteView,
        redirect: '/score/base',
        name: 'score',
        meta: {
          title: '主播评分管理',
          icon: score,
          keepAlive: false,
          permission: ['score']
        },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/score/examine',
            name: 'ScoreExamine',
            component: RouteView,
            meta: {
              title: '优质主播预审核',
              keepAlive: false,
              permission: ['score-examine']
            },
            redirect: '/score/examine/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/score/examine/list',
                name: 'ScoreExamineList',
                component: (resolve) =>
                  require(['@/views/score/examine/list'], resolve),
                meta: { title: '列表', keepAlive: false }
              },
              {
                path: '/score/examine/check',
                name: 'ScoreExamineCheck',
                component: (resolve) =>
                  require(['@/views/score/examine/check'], resolve),
                meta: { title: '审核', keepAlive: false }
              }
            ]
          },
          {
            path: '/score/base',
            name: 'ScoreBase',
            component: RouteView,
            meta: {
              title: '主播基础评分',
              keepAlive: false,
              permission: ['score-base']
            },
            redirect: '/score/base/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/score/base/list',
                name: 'ScoreBaseList',
                component: (resolve) =>
                  require(['@/views/score/base/list'], resolve),
                meta: { title: '主播基础评分-列表', keepAlive: false }
              },
              {
                path: '/score/base/grade',
                name: 'ScoreBaseGrade',
                component: (resolve) =>
                  require(['@/views/score/base/grade'], resolve),
                meta: { title: '待评分', keepAlive: false }
              }
            ]
          },
          {
            path: '/score/artist-scored',
            name: 'ScoreArtistScored',
            component: (resolve) =>
              require(['@/views/score/artist-scored/list'], resolve),
            hideChildrenInMenu: true,
            meta: {
              title: '已评分',
              keepAlive: false,
              permission: ['artist-scored']
            }
          },
          {
            path: '/score/person',
            name: 'ScorePerson',
            component: (resolve) =>
              require(['@/views/score/person/list'], resolve),
            hideChildrenInMenu: true,
            meta: {
              title: '评委管理',
              keepAlive: false,
              permission: ['score-person']
            }
          },
          {
            path: '/score/score',
            name: 'ScoreScore',
            component: RouteView,
            meta: {
              title: '主播评分列表',
              keepAlive: false,
              permission: ['score-score']
            },
            redirect: '/score/score/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/score/score/list',
                name: 'ScoreScoreList',
                component: (resolve) =>
                  require(['@/views/score/score/list'], resolve),
                meta: { title: '列表', keepAlive: false }
              },
              {
                path: '/score/score/detail',
                name: 'ScoreScoreDetail',
                component: (resolve) =>
                  require(['@/views/score/score/detail'], resolve),
                meta: { title: '评分详情', keepAlive: false }
              }
            ]
          },
          {
            path: '/score/admin',
            name: 'ScoreAdmin',
            component: RouteView,
            meta: {
              title: '主播评分列表-管理员',
              keepAlive: false,
              permission: ['score-admin']
            },
            redirect: '/score/admin/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/score/admin/list',
                name: 'ScoreAdminList',
                component: (resolve) =>
                  require(['@/views/score/score/list-admin'], resolve),
                meta: { title: '列表', keepAlive: false }
              },
              {
                path: '/score/admin/detail',
                name: 'ScoreAdminDetail',
                component: (resolve) =>
                  require(['@/views/score/score/detail-admin'], resolve),
                meta: { title: '评分详情', keepAlive: false }
              }
            ]
          },
          {
            path: '/score/marking',
            name: 'ScoreMarking',
            component: RouteView,
            meta: {
              title: '评委打分',
              keepAlive: false,
              permission: ['score-marking']
            },
            hideChildrenInMenu: true,
            redirect: '/score/marking/list',
            children: [
              {
                path: '/score/marking/list',
                name: 'ScoreMarkingList',
                component: (resolve) =>
                  require(['@/views/score/marking/list'], resolve),
                meta: { title: '评委打分列表', keepAlive: false }
              },
              {
                path: '/score/marking/detail',
                name: 'ScoreMarkingDetail',
                component: (resolve) =>
                  require(['@/views/score/marking/detail'], resolve),
                meta: { title: '待评分', keepAlive: false }
              }
            ]
          }
        ]
      },
      // 主播培训
      {
        path: '/cultivate',
        component: RouteView,
        redirect: '/cultivate/my-influencer',
        name: 'Cultivate',
        meta: {
          title: '主播培训',
          icon: system,
          keepAlive: false,
          permission: ['cultivate']
        },
        children: [
          {
            path: '/cultivate/my-influencer',
            name: 'MyInfluencer',
            component: (resolve) =>
              require(['@/views/cultivate/my-influencer'], resolve),
            meta: {
              title: '我的主播',
              keepAlive: false,
              permission: ['cultivate-my-influencer']
            }
          },
          {
            path: '/cultivate/manage-influencer',
            name: 'ManageInfluencer',
            component: (resolve) =>
              require(['@/views/cultivate/manage-influencer'], resolve),
            meta: {
              title: '管理主播账号',
              keepAlive: false,
              permission: ['manage-influencer']
            }
          },
          {
            path: '/cultivate/out-link',
            name: 'OutLink',
            component: (resolve) =>
              require(['@/views/cultivate/out-link'], resolve),
            meta: {
              title: '进入培训系统',
              keepAlive: false,
              permission: ['out-link']
            }
          }
        ]
      },
      // 公告管理
      {
        path: '/notice',
        name: 'Notice',
        component: (resolve) => require(['@/views/notice/index'], resolve),
        meta: {
          title: '公告管理',
          keepAlive: true,
          icon: report,
          permission: ['notice']
        }
      },
      // 公告详情
      {
        path: '/notice-detail',
        name: 'NoticeDetail',
        component: (resolve) => require(['@/views/notice/detail'], resolve),
        hidden: true,
        meta: { title: '公告详情' }
      },

      // 权限配置
      {
        path: '/config-auth',
        name: 'ConfigAuth',
        hidden: true,
        component: (resolve) => require(['@/views/config/auth'], resolve),
        meta: {
          title: '权限配置',
          keepAlive: true,
          icon: solution,
          permission: ['config-auth']
        }
      },

      // 菜单配置
      {
        path: '/config-menu',
        name: 'ConfigMenu',
        hidden: true,
        component: (resolve) => require(['@/views/config/menu'], resolve),
        meta: {
          title: '菜单配置',
          keepAlive: true,
          icon: solution,
          permission: ['config-menu']
        }
      }

      // 退会主播列表
      // {
      //   path: '/retired',
      //   name: 'Retired',
      //   component: () => import('@/views/retired/index'),
      //   meta: { title: '退会主播列表', keepAlive: true, icon: freedom, permission: [ 'retired' ] }
      // },

      // 反馈列表
      // {
      //   path: '/feedback',
      //   name: 'Feedback',
      //   component: () => import('@/views/feedback/index'),
      //   meta: { title: '反馈列表', keepAlive: true, icon: feedback, permission: [ 'feedback' ] }
      // },

      // 操作日志
      // {
      //   path: '/log',
      //   name: 'Log',
      //   component: () => import('@/views/log/index'),
      //   meta: { title: 'menu.log', keepAlive: true, icon: 'hdd', permission: [ 'log' ] }
      // }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 横向菜单
 * @type { *[] }
 */
export const asyncRouterMapHorizontal = [
  // {
  //   path: '/artists-cutoff',
  //   name: 'ArtistsCutoff',
  //   component: TopLayout,
  //   redirect: '/artists-cutoff/list',
  //   meta: { title: '断播主播列表', permission: [ 'artists-cutoff' ] },
  //   icon: 'user-delete',
  //   children: [
  //     {
  //       path: '/artists-cutoff/list',
  //       name: 'artist-cutoff-list',
  //       component: () => import('@/views/artists-cutoff/list'),
  //       meta: { title: '断播主播列表', keepAlive: false, permission: [ 'artists-cutoff-list' ] }
  //     },
  //     {
  //       path: '/artists-cutoff/actived',
  //       name: 'artist-cutoff-list-active',
  //       component: () => import('@/views/artists-cutoff/list-active'),
  //       meta: { title: '复播主播', keepAlive: false, permission: [ 'artists-cutoff-actived' ] }
  //     }
  //   ]
  // }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/help',
    name: 'Help',
    component: TopLayout,
    redirect: '/help/center',
    meta: { permission: ['help'] },
    hidden: true,
    children: [
      {
        path: 'center',
        name: 'center',
        component: () => import('@/views/help/index'),
        meta: { title: '帮助中心' }
      }
    ]
  },

  {
    path: '/anchor-data',
    name: 'Anchordata',
    component: TopLayout,
    redirect: '/help/center',
    meta: { permission: ['help'] },
    hidden: true,
    children: [
      {
        path: 'center',
        name: 'center-1',
        component: () => import('@/views/help/index'),
        meta: { title: '帮助中心' }
      }
    ]
  },

  {
    path: '/anchor-opt',
    name: 'Anchoropt',
    component: TopLayout,
    redirect: '/help/center',
    meta: { permission: ['help'] },
    hidden: true,
    children: [
      {
        path: 'center',
        name: 'center-2',
        component: () => import('@/views/help/index'),
        meta: { title: '帮助中心' }
      }
    ]
  },

  {
    path: '/anchor-record',
    name: 'Anchorrecord',
    component: TopLayout,
    redirect: '/help/center',
    meta: { permission: ['help'] },
    hidden: true,
    children: [
      {
        path: 'center',
        name: 'center-3',
        component: () => import('@/views/help/index'),
        meta: { title: '帮助中心' }
      }
    ]
  },

  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/200',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/200')
  }
]
