<template>
  <a-modal
    title="导出日数据明细"
    :visible="visible"
    :destroyOnClose="true"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <div class="month-wraper">
      <a-month-picker style="width:80%" value-format="YYYY-MM" v-model="month"/>
    </div>
    <div class="modal-footer mt20">
      <a-button type="primary" :loading="loading" @click="importHandle">立即导出</a-button>
    </div>
  </a-modal>
</template>

<script>
import { exportDayliyData } from '@/api/report'
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
      exportDayliyData({
        month: this.month
      }).then(res => {
        this.$message.success('开始下载，下载完成后可在【明细导出记录】导出，请勿重复操作')
        this.$emit('cancel')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
