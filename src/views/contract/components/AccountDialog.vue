<template>
  <a-drawer
    class="drawer"
    title="新增关联账号"
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
          label="直播平台">
          <a-select
            v-decorator="['platform', { rules: [{ required: true, message: '直播平台不能为空' }] }]"
            placeholder="请选择"
            @change="platformChange"
          >
            <a-select-option v-for="(item, index) in platform" :key="index" :value="parseInt(index)">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="platformType === 1"
          label="是否已加入公会">
          <a-radio-group
            v-decorator="['isUnion', { rules: [{ required: true, message: '加入公会不能为空' }] }]"
            @change="changeHandle"
          >
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="platformType === 1 && isJoin" class="form-item" label="昵称">
          <a-auto-complete
            placeholder="请输入全部昵称"
            v-decorator="['nickName', { rules: [{ required: true, message: '昵称不能为空' }] }]"
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
          v-if="!isJoin"
          label="昵称">
          <a-input
            placeholder="请输入全部昵称"
            v-decorator="['nickName', { rules: [{ required: true, message: '昵称不能为空' }] }]"
          />
        </a-form-item>
        <a-form-item
          label="账号">
          <a-input
            placeholder="请输入账号"
            v-decorator="['account', { rules: [{ required: true, message: '账号不能为空' }] }]"
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
import { anchorSearchByName } from '@/api/artists'
import { contractBindAccount } from '@/api/contract'

export default {
  name: 'Info',
  props: {
    visible: {
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
      platform: {
        0: '其他',
        1: '抖音',
        2: '火山',
        3: '小红书',
        4: '快手',
        5: '微信视频号',
        6: '斗鱼',
        7: '虎牙',
        8: '美拍',
        9: 'NOW',
        10: '易直播',
        11: '淘宝',
        12: '喜马拉雅',
        13: '熊猫'
      },

      platformType: '',
      isJoin: false,

      dataSource: [],
      nickName: ''
    }
  },
  async mounted () {
  },
  methods: {
    onClose () {
      this.form.resetFields()
      this.isJoin = false
      this.platformType = ''
      this.nickName = ''
      this.$emit('cancel')
    },
    platformChange (value) {
      this.nickName = ''
      this.isJoin = false
      this.platformType = value
    },

    onSelect (value, option) {
      const data = this.dataSource.filter(item => item.id === option.key)[0]
      this.nickName = data.name
      this.form.setFieldsValue({
        'account': data.account
      })
    },
    onSearch (query) {
      this.employeeId = ''
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 200)
    },
    dataSearchHandle (query) {
      anchorSearchByName({ nickName: query }).then(res => {
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            item.name = `${item.nickName}`
            return item
          })
        }
      })
    },
    changeHandle (e) {
      this.isJoin = e.target.value
    },
    createHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.isJoin) {
            if (!this.nickName) {
              this.$message.error('请选择昵称')
              return false
            }
          }

          let data = {}
          if (this.isJoin) {
            data = {
              ...values,
              nickName: this.nickName,
              contractId: this.contractId
            }
          } else {
            data = {
              ...values,
              contractId: this.contractId
            }
          }
          this.bindHandle(data)
        }
      })
    },
    bindHandle (data) {
      contractBindAccount(data).then(() => {
        this.$message.success('绑定成功')
        this.onClose()
      })
    }
  },
  watch: {
    visible (val) {
      if (val) {
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .form-item-con {
    padding-right: 10%;
    .ant-form-item {
      margin-bottom: 8px;
    }
  }
  .tree-content {
    height: 300px;
    overflow-y: scroll;
    /deep/ .ant-tree li span.ant-tree-checkbox {
      margin-top: 3px;
    }
  }
  .radio-content {
    margin: 0 0 18px 16px;
    .ant-radio-group {
      .ant-radio-button-wrapper {
        margin-right: 12px;
      }
    }
  }
  .pri-content {
    span {
      color: #755DD7;
    }
    .pri-btn {
      cursor: pointer;
    }
  }
</style>
