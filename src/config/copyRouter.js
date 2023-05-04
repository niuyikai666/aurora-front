import { UserLayout, BasicLayout, TopLayout } from '@/layouts'
// import { solution, feedback } from '@/core/icons'
import { solution, chart, file, search, task, system, business, dashboard } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMapVertical = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/report',
    children: [

      // 首页
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '工作台', icon: dashboard }
      },

      // 报表
      {
        path: '/report',
        name: 'Report',
        component: RouteView,
        redirect: '/report/list-live',
        meta: { title: '数据报表', icon: chart, permission: [ 'report' ] },
        children: [
          {
            path: '/report/core',
            name: 'report-core',
            component: () => import('@/views/report/core'),
            meta: { title: '核心数据分析', keepAlive: false, permission: [ 'report-core' ] }
          },
          {
            path: '/report/list-live',
            name: 'report-list-live',
            component: () => import('@/views/report/list-live'),
            meta: { title: '数据报表-直播', keepAlive: false, permission: [ 'report-live' ] }
          },
          {
            path: '/report/list-short',
            name: 'report-list-short',
            component: () => import('@/views/report/list-short'),
            meta: { title: '数据报表-短视频', keepAlive: false, permission: [ 'report-short' ] }
          }
        ]
      },

      // 主播管理
      {
        path: '/artists',
        name: 'Artists',
        component: RouteView,
        redirect: '/artists/list-live',
        meta: { title: '主播管理', icon: file, permission: [ 'artists' ] },
        children: [
          {
            path: '/artists/list-live',
            name: 'artist-list-live',
            component: () => import('@/views/artists/list-live'),
            meta: { title: '主播列表-直播', keepAlive: false, permission: [ 'aritists-live' ] }
          },
          {
            path: '/artists/list-short',
            name: 'artist-list-short',
            component: () => import('@/views/artists/list-short'),
            meta: { title: '主播列表-短视频', keepAlive: false, permission: [ 'artists-short' ] }
          },
          {
            path: '/artists/gold',
            name: 'Gold',
            component: RouteView,
            redirect: '/artists/gold/list',
            meta: { title: '主播信息补全', permission: [ 'gold' ] },
            hideChildrenInMenu: true,
            icon: 'solution',
            children: [
              {
                path: '/artists/gold/list',
                name: 'gold-list',
                component: () => import('@/views/gold/List'),
                meta: { title: '主播列表' },
                hidden: true
              },
              {
                path: '/artists/gold/business-detail',
                name: 'business-detail',
                component: () => import('@/views/gold/business-detail'),
                meta: { title: '主播详情-运营关系' },
                hidden: true
              },
              {
                path: '/artists/gold/short-media',
                name: 'short-media',
                component: () => import('@/views/gold/short-media'),
                meta: { title: '主播详情-短视频' },
                hidden: true
              },
              {
                path: '/artists/gold/relation-list',
                name: 'relation-list',
                component: () => import('@/views/gold/relation-list'),
                meta: { title: '修改记录' },
                hidden: true
              }
            ]
          },
          {
            path: '/artists/artist-relation',
            name: 'artist-relation',
            component: () => import('@/views/artists/relation'),
            meta: { title: '主播关系管理', keepAlive: false, permission: [ 'artists-relation' ] }
          },
          {
            path: '/artists/artist-settled',
            name: 'artist-settled',
            component: () => import('@/views/artists/settled'),
            meta: { title: '新入驻主播管理', keepAlive: false, permission: [ 'artists-settled' ] }
          },
          {
            path: '/artists/artist-company',
            name: 'artist-company',
            component: () => import('@/views/artists/company'),
            meta: { title: '分公司主播关系', keepAlive: false, permission: [ 'artists-company' ] }
          },
          {
            path: '/artists/detail',
            name: 'art-detail',
            component: () => import('@/views/artists/detail'),
            meta: { title: '艺人详情' },
            hidden: true
          }
        ]
      },

      // 任务管理
      {
        path: '/task',
        component: RouteView,
        redirect: '/task/manage',
        name: 'Task',
        meta: { title: '任务管理', icon: task, keepAlive: false, permission: [ 'task' ] },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/task/manage',
            name: 'TaskManage',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: { title: '管理层', keepAlive: false, permission: [ 'task-manage' ] },
            redirect: '/task/manage/list',
            children: [
              {
                path: '/task/manage/list',
                name: 'TaskManageList',
                component: () => import('@/views/task/manage/list'),
                meta: { title: '任务列表', keepAlive: false }
              },
              {
                path: '/task/manage/create',
                name: 'TaskManageCreate',
                component: () => import('@/views/task/manage/create'),
                meta: { title: '新建任务', keepAlive: false }
              },
              {
                path: '/task/manage/split',
                name: 'TaskManageSplit',
                component: () => import('@/views/task/manage/TaskSplit'),
                meta: { title: '任务拆分', keepAlive: false }
              },
              {
                path: '/task/manage/detail',
                name: 'TaskManageDetail',
                component: () => import('@/views/task/manage/detail'),
                meta: { title: '任务详情', keepAlive: false }
              },
              {
                path: '/task/manage/edit',
                name: 'TaskManageEdit',
                component: () => import('@/views/task/manage/edit'),
                meta: { title: '编辑任务', keepAlive: false }
              },
              {
                path: '/task/manage/report',
                name: 'TaskManageReport',
                component: () => import('@/views/task/manage/report'),
                meta: { title: '完成情况', keepAlive: false }
              }
            ]
          },
          {
            path: '/task/group',
            name: 'TaskGroup',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: { title: '组长层', keepAlive: false, permission: [ 'task-group' ] },
            redirect: '/task/group/list',
            children: [
              {
                path: '/task/group/list',
                name: 'TaskGroupList',
                component: () => import('@/views/task/group/list'),
                meta: { title: '任务列表', keepAlive: false }
              },
              {
                path: '/task/group/split',
                name: 'TaskGroupSplit',
                component: () => import('@/views/task/group/TaskSplit'),
                meta: { title: '任务拆分', keepAlive: false }
              },
              {
                path: '/task/group/detail',
                name: 'TaskGroupDetail',
                component: () => import('@/views/task/group/detail'),
                meta: { title: '任务详情', keepAlive: false }
              },
              {
                path: '/task/group/edit',
                name: 'TaskGroupEdit',
                component: () => import('@/views/task/group/edit'),
                meta: { title: '编辑任务', keepAlive: false }
              },
              {
                path: '/task/group/report',
                name: 'TaskGroupReport',
                component: () => import('@/views/task/group/report'),
                meta: { title: '完成情况', keepAlive: false }
              }
            ]
          },
          {
            path: '/task/operator',
            name: 'TaskOperator',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: { title: '运营层', keepAlive: false, permission: [ 'task-operator' ] },
            redirect: '/task/operator/list',
            children: [
              {
                path: '/task/operator/list',
                name: 'TaskOperatorList',
                component: () => import('@/views/task/operator/list'),
                meta: { title: '任务列表', keepAlive: false }
              },
              {
                path: '/task/operator/detail',
                name: 'TaskOperatorDetail',
                component: () => import('@/views/task/operator/detail'),
                meta: { title: '任务详情', keepAlive: false }
              },
              {
                path: '/task/operator/report',
                name: 'TaskOperatorReport',
                component: () => import('@/views/task/operator/report'),
                meta: { title: '完成情况', keepAlive: false }
              }
            ]
          }
        ]
      },

      // 主播查询
      {
        path: '/artists-operation',
        name: 'ArtistsOperation',
        component: RouteView,
        redirect: '/artists/list-live',
        meta: { title: '主播查询', icon: search, permission: [ 'artists-operation' ] },
        children: [
          {
            path: '/artists-operation/artist-search',
            name: 'artists-operation-search',
            component: () => import('@/views/artists/search'),
            meta: { title: '主播查询', permission: [ 'artists-search' ] }
          },
          {
            path: '/artists-operation/gold-data',
            name: 'GoldData',
            component: RouteView,
            redirect: '/artists-operation/gold-data/workplace',
            meta: { title: '主播关系填写', permission: [ 'gold-data' ] },
            hideChildrenInMenu: true,
            children: [
              {
                path: '/artists-operation/gold-data/workplace',
                name: 'GoldDataIndex',
                hidden: true,
                component: () => import('@/views/gold-data/index'),
                meta: { title: '搜索' }
              },
              {
                path: '/artists-operation/gold-data/detail',
                name: 'GoldDataDetail',
                hidden: true,
                component: () => import('@/views/gold-data/detail'),
                meta: { title: '金数据详情' }
              },
              {
                path: '/artists-operation/gold-data/active',
                name: 'active-apply-actived',
                component: () => import('@/views/active-apply/active'),
                meta: { title: '激活申请' },
                hidden: true
              }
            ]
          },
          {
            path: '/artists-operation/artists-cutoff/list',
            name: 'artist-cutoff-list',
            component: () => import('@/views/artists-cutoff/list'),
            meta: { title: '断播主播查询', keepAlive: false, permission: [ 'artists-cutoff-list' ] }
          },
          {
            path: '/artists-operation/artists-cutoff/actived',
            name: 'artist-cutoff-list-active',
            component: () => import('@/views/artists-cutoff/list-active'),
            meta: { title: '复播主播', keepAlive: false, permission: [ 'artists-cutoff-actived' ] }
          },
          {
            path: '/artists-operation/artist-freedom',
            name: 'ArtistFreedom',
            component: () => import('@/views/artist/Freedom'),
            meta: { title: '无运营主播', keepAlive: false, permission: [ 'artist-freedom' ] }
          },
          {
            path: '/artists-operation/active-apply',
            name: 'ActiveApply',
            component: TopLayout,
            redirect: '/artists-operation/active-apply/apply',
            meta: { title: '激活申请' },
            hideChildrenInMenu: true,
            hidden: true,
            children: [
              {
                path: '/artists-operation/active-apply/apply',
                name: 'active-apply-do',
                component: () => import('@/views/active-apply/apply'),
                meta: { title: '激活申请', keepAlive: false },
                hidden: true
              }
            ]
          }
        ]
      },

      // 合同管理
      {
        path: '/contract',
        component: RouteView,
        redirect: '/contract/manage',
        name: 'Contract',
        meta: { title: '合同管理', icon: file, keepAlive: false, permission: [ 'contract' ] },
        children: [
          {
            path: '/contract/manage',
            name: 'ContractManage',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: { title: '合同列表', keepAlive: false, permission: [ 'contract-manage' ] },
            redirect: '/contract/manage/list',
            children: [
              {
                path: '/contract/manage/list',
                name: 'ContractManageList',
                component: () => import('@/views/contract/manage/List'),
                meta: { title: '列表', keepAlive: false }
              },
              {
                path: '/contract/manage/create',
                name: 'ContractManageCreate',
                component: () => import('@/views/contract/manage/Create'),
                meta: { title: '新增合同', keepAlive: false }
              },
              {
                path: '/contract/manage/edit',
                name: 'ContractManageEdit',
                component: () => import('@/views/contract/manage/Edit'),
                meta: { title: '编辑合同', keepAlive: false }
              },
              {
                path: '/contract/manage/detail',
                name: 'ContractManageDetail',
                component: () => import('@/views/contract/manage/Detail'),
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
                    component: () => import('@/views/contract/manage/extra/List'),
                    meta: { title: '列表', keepAlive: false }
                  },
                  {
                    path: '/contract/manage/extra-create',
                    name: 'ContractManageExtraCreate',
                    component: () => import('@/views/contract/manage/extra/Create'),
                    meta: { title: '新增', keepAlive: false }
                  },
                  {
                    path: '/contract/manage/extra-edit',
                    name: 'ContractManageExtraEdit',
                    component: () => import('@/views/contract/manage/extra/Edit'),
                    meta: { title: '编辑', keepAlive: false }
                  },
                  {
                    path: '/contract/manage/extra-detail',
                    name: 'ContractManageExtraDetail',
                    component: () => import('@/views/contract/manage/extra/Detail'),
                    meta: { title: '详情', keepAlive: false }
                  }
                ]
              }
            ]
          },
          {
            path: '/contract/record',
            name: 'ContractRecord',
            component: () => import('@/views/contract/record/List'),
            meta: { title: '合同调取记录', keepAlive: false, permission: [ 'contract-record' ] }
          },
          {
            path: '/contract/extract',
            name: 'ContractExtract',
            component: () => import('@/views/contract/extract/List'),
            meta: { title: '合同调取', keepAlive: false, permission: [ 'contract-extract' ] }
          }
        ]
      },

      // 系统管理
      {
        path: '/system',
        component: RouteView,
        redirect: '/system/roles',
        name: 'System',
        meta: { title: '系统管理', icon: system, keepAlive: false, permission: [ 'system' ] },
        children: [
          {
            path: '/system/roles',
            name: 'Roles',
            component: () => import('@/views/system/roles'),
            meta: { title: '角色管理', keepAlive: false, permission: [ 'system-roles' ] }
          },
          {
            path: '/system/authority',
            name: 'Authority',
            component: () => import('@/views/system/authority'),
            meta: { title: '权限管理', keepAlive: false, permission: [ 'personnel-authority' ] }
          }
        ]
      },

      // 企业管理
      {
        path: '/personnel',
        component: RouteView,
        redirect: '/personnel/structure',
        name: 'Personnel',
        meta: { title: '企业管理', icon: business, keepAlive: false, permission: [ 'personnel' ] },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/personnel/structure',
            name: 'StructureList',
            component: () => import('@/views/personnel/structure'),
            meta: { title: '组织架构管理', keepAlive: false, permission: [ 'personnel-structure' ] }
          },
          {
            path: '/personnel/employee',
            name: 'Employee',
            component: RouteView,
            hideChildrenInMenu: true,
            meta: { title: '员工管理', keepAlive: false, permission: [ 'personnel-employee' ] },
            redirect: '/personnel/employee/list',
            children: [
              {
                path: '/personnel/employee/list',
                name: 'EmployeeList',
                component: () => import('@/views/personnel/employee/list'),
                meta: { title: '员工列表', keepAlive: false }
              },
              {
                path: '/personnel/employee/create-mutiple',
                name: 'EmployeeCreateMutiple',
                component: () => import('@/views/personnel/employee/create-mutiple'),
                meta: { title: '批量添加员工', keepAlive: false }
              },
              {
                path: '/personnel/employee/detail',
                name: 'EmployeeDetail',
                component: () => import('@/views/personnel/employee/detail'),
                meta: { title: '员工详情', keepAlive: false }
              }
            ]
          },
          {
            path: '/personnel/agent',
            name: 'Agent',
            component: () => import('@/views/agent/index'),
            meta: { title: '公会经纪人管理', keepAlive: true, permission: [ 'agent' ] }
          }
        ]
      },

      // 公告管理
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('@/views/notice/index'),
        meta: { title: '公告管理', keepAlive: true, icon: file, permission: [ 'notice' ] }
      },

      // 公告详情
      {
        path: '/notice-detail',
        name: 'NoticeDetail',
        component: () => import('@/views/notice/detail'),
        hidden: true,
        meta: { title: '公告详情' }
      },

      // 权限配置
      {
        path: '/config-auth',
        name: 'ConfigAuth',
        hidden: true,
        component: () => import('@/views/config/auth'),
        meta: { title: '权限配置', keepAlive: true, icon: solution, permission: [ 'config-auth' ] }
      },

      // 菜单配置
      {
        path: '/config-menu',
        name: 'ConfigMenu',
        hidden: true,
        component: () => import('@/views/config/menu'),
        meta: { title: '菜单配置', keepAlive: true, icon: solution, permission: [ 'config-menu' ] }
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
    path: '*', redirect: '/404', hidden: true
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
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/help',
    name: 'Help',
    component: TopLayout,
    redirect: '/help/center',
    meta: { permission: [ 'help' ] },
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
    meta: { permission: [ 'help' ] },
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
    meta: { permission: [ 'help' ] },
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
    meta: { permission: [ 'help' ] },
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
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/200',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/200')
  }

]
