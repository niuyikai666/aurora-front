<template>
  <div>
    <a-drawer
      class="drawer"
      title="调取申请"
      :width="400"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <div>
        <a-form
          class="form"
          :form="form"
        >
          <a-form-item
            label="主播姓名">
            <a-input
              placeholder="请输入主播姓名"
              v-decorator="['pbName', { rules: [{ required: true, message: '主播姓名不能为空' }] }]"
            />
          </a-form-item>
          <a-form-item
            label="主播身份证号">
            <a-input
              placeholder="请输入身份证号"
              v-decorator="['pbIdCard', { rules: [{ required: true, message: '主播身份证号不能为空' }] }]"
            />
          </a-form-item>
          <a-form-item class="form-item" label="调取人姓名">
            <a-auto-complete
              style="width: 100%"
              v-decorator="['checkEmpId', { rules: [{ required: true, message: '调取人不能为空' }] }]"
              placeholder="请搜索"
              option-label-prop="title"
              @search="onSearch"
              @select="onSelect"
            >
              <template slot="dataSource">
                <a-select-option v-for="item in dataSource" :key="item.id" :title="item.name">
                  <span>{{ item.name }}</span>
                </a-select-option>
              </template>
              <a-input>
                <a-icon slot="suffix" type="search" />
              </a-input>
            </a-auto-complete>
          </a-form-item>
          <a-form-item
            label="调取事由">
            <a-textarea
              placeholder="请输入调取事由"
              v-decorator="['applyReason', { rules: [{ required: true, message: '调取事由不能为空' }] }]"
              auto-size
            />
          </a-form-item>
          <a-form-item
            :required="true"
            label="调取内容">
            <div class="con">
              <span v-if="checkDataText">{{ checkDataText }}</span>
              <span style="margin-left:10px;" class="opt" @click="labelHandle">请选择</span>
            </div>
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
        <a-button class="disable" type="primary" :style="{ marginRight: '16px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="createHandle()">
          确认申请
        </a-button>
      </div>
    </a-drawer>
    <label-info-dialog v-if="show" @cancel="labelCancel" :visible="show" :checkData="checkData" @confirm="checkFiledsConfirm" />
  </div>
</template>

<script>
import LabelInfoDialog from './LabelInfoDialog'
import { getTitleInfoByIdCard, extractApply, getExtractCheckInfo } from '@/api/contract'
import { employeeSearch } from '@/api/personnel'
import { labelData } from '../labels'
import pick from 'lodash.pick'

const fileds = [
	'pbName',
	'pbIdCard',
	'checkEmpId',
	'applyReason'
]

export default {
  components: {
    LabelInfoDialog
  },
  name: 'ApplyDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: [ Number, String ],
      default: ''
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      model: {},
      fileds,
      show: false,

      employeeId: '',
      dataSource: [],

      contractId: '',
      idCard: '',
      checkData: [],
      checkDataText: '',
      labelData
    }
  },
  mounted () {
  },
  methods: {
    getApplyInfoHandle () {
      getExtractCheckInfo(this.id).then(model => {
        this.checkData = model.checkColumn
        this.checkDataText = this.getText(model.checkColumn)

        this.employeeId = model.checkEmpId
        this.dataSource = [
          {
            id: model.checkEmpId,
            name: model.employeeName
          }
        ]
        this.$nextTick(() => {
          model && this.form.setFieldsValue(pick(model, this.fileds))
          this.idCard = model.pbIdCard
        })
      })
    },
    getTitleInfoByIdCardHandle (idCard) {
      getTitleInfoByIdCard(idCard).then(res => {
        if (res.length <= 0) {
          this.$message.error('未查询到主播合同信息')
          return
        }
        this.contractId = res.filter(item => item.contractType === 'contract')[0].id
        res.forEach(item => {
          item['key'] = []
        })
        this.checkData = res
        this.show = true
      })
    },
    onClose () {
      this.resetModel()
      this.$emit('cancel')
    },
    resetModel () {
      this.form.resetFields()
      this.checkData = []
      this.checkDataText = ''
      this.employeeId = ''
      this.idCard = ''
      this.model = {}
    },
    onSelect (value, option) {
      const data = this.dataSource.filter(item => item.id === option.key)[0]
      this.employeeId = data.id
    },
    onSearch (query) {
      this.employeeId = ''
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 200)
    },
    dataSearchHandle (query) {
      employeeSearch({ searchName: query }).then(res => {
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            item.name = `${item.name}(${item.departmentInfo.fullName})`
            return item
          })
        }
      })
    },
    createHandle () {
      if (this.employeeId === '') {
        this.form.setFieldsValue({
          checkEmpId: ''
        })
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.checkData.length <= 0 || this.checkDataText === '') {
            this.$message.error('请选择调取内容')
            return
          }

          let data = {}
          data = {
            contractId: this.contractId,
            ...values,
            checkColumn: this.checkData
          }

          this.extractApplyHandle(data)
        }
      })
    },
    extractApplyHandle (data) {
      extractApply(data).then(() => {
        this.$message.success('申请成功')
        this.resetModel()
        this.$emit('success')
      })
    },
    labelHandle () {
      const idCard = this.form.getFieldValue('pbIdCard')
      if (!idCard) {
        this.$message.error('请填写身份证号')
        return
      }

      if (this.idCard !== idCard) {
        this.idCard = idCard
        this.getTitleInfoByIdCardHandle(this.idCard)
      } else {
        if (this.checkData.length <= 0) {
          this.$message.error('未查询到主播信息')
          return
        }
        this.show = true
      }
    },
    labelCancel () {
      this.show = false
    },
    checkFiledsConfirm (data) {
      this.checkData = JSON.parse(JSON.stringify(data))
      this.checkDataText = this.getText(this.checkData)
      this.show = false
    },
    getText (data) {
      let pcon = ''
      data.forEach(item => {
        item.key.forEach(it => {
          pcon += `${this.labelData[it]},`
        })
      })

      if (pcon.trim() === '') {
        return ''
      } else {
        return `${pcon.substring(0, 20)}...`
      }
    }
  },
  watch: {
    id (val) {
      if (val) {
        this.$nextTick(() => {
          this.getApplyInfoHandle()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .opt {
    cursor: pointer;
    color: #755dd7;
  }
</style>
