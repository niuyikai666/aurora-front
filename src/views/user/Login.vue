<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
      >
        <a-tab-pane key="tab1" tab="手机号登录">
          <a-form-item>
            <a-input size="large" type="text" placeholder="手机号" v-decorator="['phone', {rules: [{ required: true, pattern: /^1[123456789]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" placeholder="验证码" v-decorator="['code', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha login-btn"
                type="primary"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
          <a-form-item>
            <!-- <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox> -->
            <a-button class="btn-fs" :class="{ 'btn-fs-mid': customActiveKey === 'tab2' }" type="link" @click="qrcodeHandle">{{ customActiveKey === 'tab1' ? '使用飞书登录' : '使用手机号快速登录' }}</a-button>
          </a-form-item>
          <a-form-item style="margin-top:24px">
            <a-button
              v-if="customActiveKey === 'tab1'"
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >登 录</a-button>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="账号密码登录">
          <a-spin class="qrcode-content" tip="加载中..." :spinning="spinning">
            <div id="qrcode" ref="qrcodeDom"></div>
          </a-spin>
          <a-form-item>
            <a-button class="btn-fs" :class="{ 'btn-fs-mid': customActiveKey === 'tab2' }" type="link" @click="qrcodeHandle">{{ customActiveKey === 'tab1' ? '使用飞书登录' : '使用手机号快速登录' }}</a-button>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import defaultSettings from '@/config/defaultSettings'
// import { updateTheme } from '@ant-design-vue/pro-layout'
import { updateTheme } from '@/components/SettingDrawer/settingConfig'
import { getCode } from '@/api/common'
import { getQrcodeUrl } from '@/api/login'
import QRCode from 'qrcodejs2'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  components: {
    QRCode
  },
  data () {
    return {
      timer: null,
      websock: null,
      socketUrl: `${process.env.VUE_APP_SOCKET_URL}/socket/`,
      sessionId: '',
      qrcodeRefresh: false,
      customActiveKey: 'tab1',
      loginBtn: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      },
      spinning: true
    }
  },
  mounted () {
    updateTheme(defaultSettings.primaryColor)
  },
  methods: {
    ...mapActions(['Login', 'LoginQrcode', 'Logout']),
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['phone', 'code']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const { form: { validateFields }, state } = this

      validateFields(['phone'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          getCode({ phone: values.phone }).then(res => {
          }).catch(() => {
            clearInterval(interval)
            state.time = 60
            state.smsSendBtn = false
          })
        }
      })
    },

    // 生成二维码
    qrcodeCreate () {
      getQrcodeUrl().then(res => {
        this.sessionId = res.state
        this.socketUrl = `${this.socketUrl}${res.state}`

        const qrcode = new QRCode('qrcode', {
          width: 215,
          height: 215, // 高度
          text: res.url // 二维码内容
        })
        console.log(qrcode)
        this.spinning = false
        // 建立socket链接
        this.initWebSocket()
      })
    },
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },

    qrcodeHandle () {
      const k = this.customActiveKey
      this.customActiveKey = k === 'tab1' ? 'tab2' : 'tab1'
      if (this.customActiveKey === 'tab2') {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.qrcodeDom.innerHTML = ''
            this.qrcodeCreate()
          })
        }, 500)
      } else {
        // console.log('主动关闭socket链接')
        this.spinning = true
        this.websock && this.websock.close()
      }
    },

    initWebSocket () {
      this.websock = new WebSocket(this.socketUrl)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      const actions = { 'sendTest': 'sokect-send-test' }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) { // 数据接收
      const data = e.data
      // 登录成功
      if (data.includes('name')) {
        const jsonData = JSON.parse(data)
        // 二维码登录
        this.LoginQrcode(jsonData)
          .then(res => this.loginSuccess(res))
          .finally(() => {
            this.state.loginBtn = false
          })
      }
      // 登录失败
      if (data.includes('loginError')) {
        const jsonData = JSON.parse(data)
        this.$notification['error']({
          message: '错误',
          description: jsonData.loginError,
          duration: 4
        })
      }
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      if (!storage.get(ACCESS_TOKEN)) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.initWebSocket()
        }, 500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
    &:hover,
    &:active,
    &:visited,
    &:focus {
      color: #755DD7;
      border-color: #755DD7;
    }
  }

  .forge-password {
    font-size: 14px;
  }
  .login-btn{
    background-color: #755DD7;
    border-color: #755DD7;
    color:#fff;
    &:hover{
      color: #fff;
    }
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
    background-color: #755DD7;
    border-color: #755DD7;
  }

  .btn-fs {
    float: right;
    color: #755DD7;
    &.btn-fs-mid {
      float: none;
      display: block;
      margin: 0 auto;
    }
  }
}
.qrcode-content {
  width: 215px;
  height: 215px;
  margin: 0 auto 5px auto;
}
.main {
  /deep/ .ant-tabs-nav-wrap {
    display: none;
  }
}
</style>
