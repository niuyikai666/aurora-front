<template>
  <a-modal
    title="管理到期时间"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="loading"
    ok-text="立即生效"
    @cancel="$emit('cancel')"
    @ok="submit"
  >
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="到期时间">
        <a-date-picker
          :disabled="frezen"
          value-format="YYYY-MM-DD"
          v-model="time"
          :disabledDate="disabledDate"
        />
        <a-checkbox v-model="frezen" @change="changeCheckbox" class="ml5">立即到期(冻结)</a-checkbox>
      </a-form-item>
    </a-form>
    <div class="desc">账号到期后账号会被冻结，非直接删除</div>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { manageMyActivedTime, frozenAccount } from '@/api/cultivate'
export default {
  data() {
    return {
      loading: false,
      frezen: false,
      time: ''
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
      if (!this.frezen && !this.time) {
        return
      }
      const time = this.time
      if (this.loading) return
      this.loading = true
      if (this.frezen) {
        frozenAccount({
          id: this.selectedRowKeys.join(',')
        }).then(() => {
          this.loading = false
          this.$message.success('操作成功')
          this.$emit('cancel')
          this.$parent.refresh()
        }).catch(() => {
          this.loading = false
        })
      } else {
        manageMyActivedTime({
          id: this.selectedRowKeys.join(','),
          time: time
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
    changeCheckbox (e) {
      this.$nextTick(() => {
        if (this.frezen) {
          this.time = ''
        }
      })
    },
    disabledDate (time) {
      return moment(time.format('YYYY-MM-DD')).format('x') < moment(moment(new Date()).format('YYYY-MM-DD')).format('x')
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.time = ''
          this.frezen = false
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.desc {
  color: #DC0D0D;
}
</style>
