<template>
  <a-modal
    title="变更超级管理员"
    :width="348"
    :visible="visible"
    @cancel="cancelHandle"
  >
    <template slot="footer">
      <a-button key="cancel" @click="cancelHandle">取 消</a-button>
      <a-button key="create" type="primary" @click="createHandle">确 定</a-button>
    </template>
    <div class="d-content">
      <div class="item">
        <p class="d-title">原超级管理员</p>
        <div class="crip">
          <p class="label">短信验证码</p>
          <div class="search-cont">
            <a-input
              v-model="veriCode"
              placeholder="请输入短信验证码"
            />
            <a-button
              ref="btnCode"
              class="btn-veri-code change-code"
              :disabled="veriActive"
              @click.native.prevent="getCodeHandle"
            >{{ veriName }}</a-button>
          </div>
        </div>
      </div>
      <div class="item">
        <p class="d-title">新超级管理员</p>
        <div class="crip">
          <p class="label">新超级管理员账号</p>
          <a-auto-complete
            style="width: 100%"
            placeholder="请选择账号"
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
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { employeesSearch } from '@/api/admin'
import { getCode1 } from '@/api/common'

export default {
  name: 'ChangeDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      value: '',
      dataSource: [],
      adminId: '',

      veriCode: '',
      veriName: '获取验证码',
      veriCount: 60,
      veriActive: false
    }
  },
  mounted () {
  },
  methods: {
    onSelect (value, option) {
      const data = this.dataSource.filter(item => item.id === option.key)[0]
      this.adminId = data.id
    },
    onSearch (query) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 500)
    },
    dataSearchHandle (query) {
      if (query.trim() === '') return
      employeesSearch(query).then(res => {
        this.adminId = ''
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            item.name = `${item.name}`
            return item
          })
        }
      })
    },
    getCodeHandle () {
      // 主动失焦
      this.$refs.btnCode.$el.blur()

      if (this.veriActive) return
      this.veriActive = true
      this.countDown()
      getCode1('CHANGE_ADMIN').then(res => {
        // console.log('发送验证码', res)
      })
    },
    countDown () {
      var inteval = setInterval(() => {
        this.veriName = `${this.veriCount}s`
        this.veriCount = --this.veriCount
        if (this.veriCount < 0) {
          this.veriName = '重新发送'
          this.veriCount = 60
          this.veriCount = false
          this.veriActive = false
          clearInterval(inteval)
        }
      }, 1000)
    },
    cancelHandle () {
      this.$emit('update:visible', false)
      this.veriCode = ''
      this.adminId = ''
      this.dataSource = []
    },
    createHandle () {
      if (this.veriCode === '') {
        this.$message.error('验证码不能为空')
        return false
      }
      if (this.adminId === '') {
        this.$message.error('请选择新的管理员账号')
        return false
      }
      // this.$emit('update:visible', false)
      // console.log(this.value)
    }
  },
  watch: {
    id (val) {
      // console.log('主播id', val)
    }
  }
}
</script>

<style lang="less" scoped>
  .d-content {
    .item {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
      .d-title,
      .crip {
        font-size: 12px;
        color: rgba(115,115,115, .85);
      }
      .d-title {
        margin-bottom: 10px;
      }
      .label {
        color: #595959;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .flex-box {
        border-bottom: solid 1px rgba(0,0,0,.06);
        padding-bottom: 16px;
      }
      .bold {
        color: rgba(0,0,0,.85);
        font-size: 16px;
        margin-right: 12px;
      }
    }
  }
</style>
