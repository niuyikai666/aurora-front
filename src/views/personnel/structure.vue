<template>
  <div class="container">
    <a-card
      class="card-structure card-title-large"
      title="组织架构管理"
      :bordered="false"
    >
      <div class="structure-content">
        <div class="left-content">
          <tree ref="tree" :permission="permission" @select="selectInfoHandle" @success="strucSuccessHandle" />
        </div>
        <div class="right-content">
          <stru-table
            ref="departTable"
            :departid="selectDepartId"
            :departmentType="departmentType"
            :title="selectTitle"
            :permission="permission"
            :departmentManager="departmentManager"
            @strucDetail="strucDetail"
            @success="strucSuccessHandle"
          />
        </div>
        <a-drawer
          class="draw"
          title="部门详情"
          placement="right"
          :closable="false"
          :visible="visible"
          :get-container="false"
          :wrap-style="{ position: 'absolute' }"
          @close="onClose"
        >
          <dl v-if="struc" class="description-content">
            <dd>
              <label>名称：</label>
              <span>{{ struc.name }}</span>
            </dd>
            <dd>
              <label>所属分类：</label>
              <span>{{ struc.type.msg }}</span>
            </dd>
            <dd>
              <label>所属组织：</label>
              <span>{{ struc.fullName }}</span>
            </dd>
          </dl>
        </a-drawer>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import Tree from './components/Tree'
import StruTable from './components/Table'
import { getStructureDetail } from '@/api/personnel'

export default {
  name: 'Structure',
  components: {
    PageHeaderWrapper,
    Tree,
    StruTable
  },
  data () {
    return {
      selectDepartId: 0,
      departmentType: null,
      selectTitle: '',
      departmentManager: '',
      visible: false,
      struc: null
    }
  },
  methods: {
    selectInfoHandle (data) {
      this.selectDepartId = data.id
      this.departmentType = data.type
      this.selectTitle = data.title
      this.departmentManager = data.departmentManager
    },
    getStrucHandle (id) {
      getStructureDetail(id).then(res => {
        this.struc = res
      })
    },
    strucDetail (id) {
      // this.getStrucHandle(id)
      // this.visible = true
    },
    onClose () {
      this.visible = false
    },
    strucSuccessHandle () {
      this.$refs.tree.refresh()
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
