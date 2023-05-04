<template>
  <a-modal
    title="激活主播培训账号"
    :visible="visible"
    :destroyOnClose="true"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <div v-if="!message">
      <div class="txt-center">是否立即激活选中的{{ selectedRowKeys.length }}条主播？</div>
      <div class="txt-center">激活后将以金数据手机号作为登录账号</div>
    </div>
    <div class="txt-center active" v-if="message">{{ message }} <a-button type="link" @click="down">点击下载</a-button></div>
    <div class="footer-flex mt20" v-if="!message">
      <a-button style="margin-right:100px" @click="$emit('cancel')">取消</a-button>
      <a-button type="primary" @click="submit" :loading="loading">立即激活</a-button>
    </div>
    <div class="footer-flex mt20" v-if="message">
      <a-button type="primary" @click="$emit('cancel')">确定</a-button>
    </div>
  </a-modal>
</template>

<script>
import { activeAccount } from '@/api/cultivate'
export default {
  data() {
    return {
      loading: false,
      message: ''
    }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectedRowKeys: {
      type: Array,
      default: null
    }
  },
  components: {},

  mounted() {},

  methods: {
    submit() {
      if (this.loading) return
      this.loading = true
      activeAccount({
          id: this.selectedRowKeys.join(',')
      }).then(res => {
          this.loading = false
          if (!res.failureCount) {
            this.$message.success('操作成功')
            this.$emit('cancel')
          } else {
            this.message = `本次同步的${this.selectedRowKeys.length}条记录，失败${res.failureCount}条`
            this.code = res.code
          }
          this.$parent.refresh()
      }).catch(() => {
        this.loading = false
      })
    },
    down () {
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/coolcolleges/active/failure-infos/${this.code}`
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.message = ''
          this.code = ''
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.footer-flex{
  display: flex;
  justify-content: center;
}
.txt-center{
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  color: #DC0D0D;
  &.active{
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
