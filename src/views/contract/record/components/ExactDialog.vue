<template>
  <a-drawer
    class="drawer"
    title="内容查看"
    :width="700"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="cancelHandle"
  >
    <div>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        row-key="id"
      >
        <span slot="cloum" slot-scope="text, record">
          {{ labelData[record.cloum] }}
        </span>
      </a-table>
      <a-form
        class="form"
        :form="form"
      >
        <a-form-item
          style="margin-top:20px;"
          layout="inline"
          label="审核">
          <a-radio-group
            v-decorator="['state', { rules: [{ required: true, message: '请选择审核状态' }] }]"
            @change="checkChange"
          >
            <a-radio :value="2">
              通过
            </a-radio>
            <a-radio :value="3">
              拒绝
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="checkType !== 3"
          label="可查看天数">
          <a-input
            style="width:180px;"
            placeholder="请输入"
            v-decorator="['validity', { rules: [{ required: true, message: '查看天数不能为空' }], getValueFromEvent: (e) => inputNumberHandle(e) }]"
          />
        </a-form-item>
      </a-form>
    </div>
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
      <a-button class="disable" type="primary" :style="{ marginRight: '16px' }" @click="cancelHandle">
        取消
      </a-button>
      <a-button type="primary" @click="confirmHandle()">
        确认
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import { extractContent, extractCheck } from '@/api/contract'
import { labelData } from '../../extract/labels'

const columns = [
  {
    title: '字段名称',
    dataIndex: 'cloum',
    scopedSlots: { customRender: 'cloum' }
  },
  {
    title: '信息来源',
    dataIndex: 'source'
  }
]

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      columns,
      dataSource: [],
      labelData,

      checkType: ''
    }
  },
  mounted () {
    if (this.id === '') return false
  },
  methods: {
    extractContentHandle () {
      extractContent(this.id).then(res => {
        res.forEach(item => {
          item['id'] = Math.random(100) * 100
        })
        this.dataSource = res
      })
    },
    cancelHandle () {
      this.dataSource = []
      this.$emit('cancel')
    },
    confirmHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            id: this.id,
            ...values
          }

          this.extractCheckHandle(data)
        }
      })
    },
    extractCheckHandle (data) {
      extractCheck(data).then(() => {
        this.$message.success('操作成功')
        this.$emit('success')
      })
    },
    inputNumberHandle (e) {
      const value = e.target.value.replace(/\D+/g, '')
      if (value === '') {
        return ''
      } else {
        return parseInt(value)
      }
    },
    checkChange (e) {
      this.checkType = e.target.value
    }
  },
  watch: {
    id (val) {
      if (val) {
        this.extractContentHandle()
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-modal-body {
  padding-top: 18px;
}
</style>
