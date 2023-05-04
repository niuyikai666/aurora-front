<template>
  <a-modal
    title="设置确认时间"
    :visible="visible"
    ok-text="立即生效"
    @ok="submitHandle"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    :destroyOnClose="true"
  >
    <div class="top-text mb16">当前结算关系确认时间：{{ text }}</div>
    <a-form :label-col="{ span: 12 }" :wrapper-col="{ span: 10 }">
      <a-form-item :label="`请设置${nowMonth}月的结算关系确认截止时间：`">
        <div>
          <a-date-picker value-format="YYYY-MM-DD" v-model="expirationDate" />
        </div>
        <div>
          <a-checkbox v-model="isShow">
            页面可见
          </a-checkbox>
        </div>
      </a-form-item>
      <div style="margin-top:-10px">
        <p class="red-desc">可选时间为结算月次月1号之后的整月时间</p>
        <p class="red-desc">如不设置则默认结算月次月的1日00:00开始到月末最后一天23:59截止</p>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      month: '',
      expirationDate: '',
      isShow: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: null
    },
    loading: {
      type: Boolean,
      default: null
    },
    times: {
      type: [Object, String],
      default: null
    },
    text: {
      type: [Object, String],
      default: null
    },
    nowMonth: {
      type: [Object, String],
      default: null
    }
  },
  components: {
  },

  mounted () {
  },

  methods: {
    submitHandle () {
      // if (!this.expirationDate) {
      //   this.$message.error('请选择截止时间')
      //   return
      // }
      this.$emit('submit', {
        expirationDate: this.expirationDate,
        isShow: this.isShow
      })
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.expirationDate = this.times.endDate
          this.isShow = this.times.isShow
        }
      },
      immediate: true
    }
  }
}

</script>
<style lang='less' scoped>
.top-text{
  line-height: 40px;
  background: #F1EEFC;
  color: #755DD7;
  padding: 0 10px;
}
.red-desc{
  color: #DC0D0D;
  margin: 0;
}
</style>
