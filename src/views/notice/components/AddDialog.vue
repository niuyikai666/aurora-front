<template>
  <a-drawer
    class="drawer"
    title="新增公告"
    :width="400"
    :visible="show"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <div>
      <a-form :form="form">
        <a-form-item label="标题">
          <a-input
            v-decorator="['title', {rules: [{ required: true, message: '标题不能为空' }] }]"
            placeholder="请输入标题"/>
        </a-form-item>
        <a-form-item label="类型">
          <a-select
            v-decorator="['type', {rules: [{ required: true, message: '类型不能为空' }] }]"
            placeholder="请选择类型"
          >
            <a-select-option :value="1">
              通知公告
            </a-select-option>
            <a-select-option :value="2">
              任务说明
            </a-select-option>
            <a-select-option :value="3">
              系统公告
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="内容" >
          <a-textarea
            v-decorator="['content', {rules: [{ required: true, message: '内容不能为空' }] }]"
            placeholder="请输入内容"/>
        </a-form-item>
      </a-form>
      <tab-content title="数据权限 (必选)" :titleLine="true" style="margin-top:10px;">
        <a-radio-group v-model="dataType">
          <a-radio-button :value="1">
            全部数据范围
          </a-radio-button>
          <a-radio-button :value="2">
            自定义数据范围
          </a-radio-button>
        </a-radio-group>
        <div v-show="dataType === 2" class="pri-content" style="margin-top:10px;">
          <div class="crip">
            <p v-if="checkedNames.length > 0">
              已选择
              <span>{{ checkedNames[0] ? `${checkedNames[0]}` : '' }} {{ checkedNames[0] && checkedNames.length === 1 ? '' : '、' }} </span>
              <span>{{ checkedNames[1] ? `${checkedNames[1]}` : '' }} {{ checkedNames[1] && checkedNames.length > 2 ? '、' : '' }} </span>
              <span>{{ checkedNames[2] ? `${checkedNames[2]}` : '' }} {{ checkedNames[2] && checkedNames.length > 3 ? '、' : '' }} </span>
              <span>{{ checkedNames[3] ? `${checkedNames[3]}` : '' }} {{ checkedNames[3] && checkedNames.length > 4 ? '、' : '' }} </span>
              <span>{{ checkedNames[4] ? `${checkedNames[4]}` : '' }} </span>
              <i v-if="checkedNames.length > 5">... </i>
              , 共 <span>{{ checkedNames.length }} </span>个部门
            </p>
            <p v-else>
              请选择员工权限覆盖的部门范围
            </p>
          </div>
          <div class="setting">
            <span v-if="checkedNames.length <= 0" @click="settingHandle()" class="pri-btn"><a-icon type="unordered-list" /> 设置范围</span>
            <span v-else @click="settingHandle()" class="pri-btn"><a-icon type="edit" /> 修改范围</span>
          </div>
        </div>
      </tab-content>
    </div>

    <a-modal
      title="设置"
      :width="400"
      :visible="visible"
      @cancel="cancelHandle"
      @ok="confirmHandle"
    >
      <div class="tree-content">
        <a-tree
          class="tree"
          @check="onCheck"
          v-model="checkedKeys"
          :default-expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          checkable
          show-icon
          :tree-data="treeData"
        >
          <a-icon slot="sec" type="team" />
        </a-tree>
      </div>
    </a-modal>

    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button class="disable" type="primary" :style="{ marginRight: '16px' }" @click="onClose">
        取消
      </a-button>
      <a-button type="primary" @click="createHandle()">
        确认添加
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import TabContent from '@/components/GlobalHeader/modal/TabContent.vue'
import { getStructureTreeAll } from '@/api/personnel'
import { noticeCreate } from '@/api/notice'
// import { toTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'

export default {
  components: { TabContent },
  name: 'Info',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    contractId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      model: {},

      // 数据权限
      dataType: 1,
      visible: false,
      originTree: [],
      originTreeArr: [],
      treeData: [],
      expandedKeys: [1],
      autoExpandParent: true,
      checkedKeys: [],
      checkedNames: []
    }
  },
  mounted () {
    this.getStructureTreeAllHandle()
  },
  methods: {
    async getStructureTreeAllHandle () {
      const data = await getStructureTreeAll()
      this.originTreeArr = data
      this.originTree = createTree(data)
      this.treeData = this.generateTree2(this.originTree)
    },

    generateTree2 (arr) {
      arr.forEach(item => {
        item['title'] = item.name
        item['key'] = item.id
        item['scopedSlots'] = { title: 'custom' }
        item['slots'] = { icon: 'sec' }
        item['disableCheckbox'] = false
        if (!item.enabled) {
          item['disableCheckbox'] = true
        }

        if (item.children) {
          this.generateTree2(item.children)
        }
        return item
      })
      return arr
    },
    onClose () {
      this.form.resetFields()
      this.$emit('cancel')
    },
    createHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.dataType === 2 && this.checkedKeys.length <= 0) {
            this.$message.error('请设置数据范围')
            return false
          }

          let data = {}
          data = {
            ...values,
            depIds: this.dataType === 1 ? 0 : this.checkedKeys
          }

          this.submitHandle(data)
        }
      })
    },

    submitHandle (data) {
      noticeCreate(data).then(() => {
        this.$message.success('新增成功')
        this.onClose()
      })
    },

    // 数据权限
    settingHandle (id) {
      this.visible = true
    },
    cancelHandle () {
      this.visible = false
    },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    confirmHandle () {
      this.generateCheckNames()
      this.visible = false
    },
    generateCheckNames () {
      this.checkedNames = []
      this.originTreeArr.forEach(item => {
        this.checkedKeys.forEach(id => {
          if (item.id === id) {
            this.checkedNames.push(item.name)
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pri-content {
    span {
      color: #755DD7;
    }
    .pri-btn {
      cursor: pointer;
    }
  }
</style>
