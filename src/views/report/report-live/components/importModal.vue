<template>
  <a-modal
    title="导出关系表"
    :visible="visible"
    :destroyOnClose="true"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <div class="month-wraper">
      <a-month-picker style="width:80%" value-format="YYYY-MM" :disabledDate="disabledDate" v-model="month"/>
    </div>
    <div class="modal-footer mt20">
      <a-button type="primary" :loading="loading" @click="importHandle">立即导出</a-button>
    </div>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { exportPlatformRelation } from '@/api/report'
export default {
  data () {
   return {
     loading: false,
     month: ''
   }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {},

  mounted () {},

  methods: {
    importHandle () {
      if (!this.month) {
        this.$message.error('请选择导出月份')
        return
      }
      this.loading = true
      exportPlatformRelation(this.month).then(res => {
        const blob = new Blob([res])
        const url = window.URL.createObjectURL(blob) // 创建 url 并指向 blob
        const a = document.createElement('a')
        a.href = url
        a.download = `抖音明细关系表${this.month}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
        this.$message.success('导出成功！')
        this.$emit('cancel')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    disabledDate (time) {
      // return time.valueOf() > new Date(this.endNewTime) || time.valueOf() < new Date((new Date(this.endNewTime)).getTime() - 150 * 24 * 3600 * 1000)
      return time > moment().subtract(0, 'days')
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.month = ''
        }
      }
    }
  }
}

</script>
<style lang='less' scoped>
.modal-footer, .month-wraper{
  display: flex;
  justify-content: center;
}
</style>
