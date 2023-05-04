<template>
  <a-modal
    title="激活主播培训账号"
    :visible="visible"
    :destroyOnClose="true"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <div v-if="!message">
      <div class="txt-center">是否立即激活主播？</div>
      <div class="txt-center">登录手机号 {{ phone || '-' }}</div>
    </div>
    <div class="footer-flex mt20">
      <a-button style="margin-right:100px" @click="$emit('cancel')">取消</a-button>
      <a-button type="primary" @click="submit" :loading="loading">立即激活</a-button>
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
    phone: {
      type: [String, Number],
      default: null
    },
    id: {
      type: [String, Number],
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
          id: this.id
      }).then(res => {
          this.loading = false
          this.$message.success('操作成功')
          this.$emit('cancel')
          this.$parent.refresh()
      }).catch(() => {
        this.loading = false
      })
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
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
