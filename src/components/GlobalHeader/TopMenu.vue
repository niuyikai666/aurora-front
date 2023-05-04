<template>
  <div class="top-menu-content">
    <ul class="menu-list" v-if="menuList.length > 0">
      <li
        class="item"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <a-dropdown>
          <a class="ant-dropdown-link" :class="{'active': $route.fullPath === item.path || currParentPath === item.path}" @click="toPage(item.path)">
            <svg-icon class="icon navigation-icon" :icon-class="item.icon"/> {{ item.meta.title }}
          </a>
          <a-menu slot="overlay" v-if="!menuChildrenHideHandle(item.children)">
            <a-menu-item
              :class="{'ant-dropdown-menu-item-active': $route.fullPath.includes(it.path)}"
              v-if="!it.hidden"
              v-for="(it, idx) in item.children"
              :key="idx"
            >
              <router-link :to="it.path">{{ it.meta.title }}</router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'TopMenu',
  props: {
    prefixCls: {
      type: String,
      default: ''
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      menuList: [],
      currParentPath: '',
      sessionStorage: sessionStorage
    }
  },
  mounted () {
    this.menuList = store.getters.addHorizontalRouters

    this.generateParentPath()
    this.$watch('$route', () => {
       this.generateParentPath()
    })
  },
  methods: {
    toPage (path) {
      this.$router.push({ path: path })
    },

    // 检测子菜单是否全部为空
    menuChildrenHideHandle (child) {
      let isNone = true
      if (child && child.length > 0) {
        child.forEach(item => {
          if (!item.hidden) {
            isNone = false
          }
        })
      }
      return isNone
    },

    generateParentPath () {
      this.currParentPath = `/${this.$route.fullPath.split('/')[1]}`
    }
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
.top-menu-content {
  min-width: 908px;
  overflow: hidden;
}
.menu-list {
  padding-left: 0;
  .item {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    padding: 0 2px;
  }
  .ant-dropdown-link {
    display: block;
    color: #595959;
    padding: 0 20px;
    height: 60px;
    &.active,
    &:hover {
      color: @primary-color;
    }
  }
}
.icon{
  color: inherit;
}
.ant-dropdown {
  .ant-dropdown-menu {
    li {
      &.ant-dropdown-menu-item-active {
        background-color: @primary-1;
        a {
          color: @primary-color !important;
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .navigation-icon {
    display: none;
  }
}
</style>
