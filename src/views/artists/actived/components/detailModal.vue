<template>
  <a-modal
    :width="700"
    :visible="visibleModal"
    title="查看激活申请"
    :destroyOnClose="true"
    :footer="null"
    @cancel="cancel"
  >
    <a-row :gutter="[24,24]" style="margin-bottom:12px">
      <a-col :span="12">
        发起人: {{ data.sponsorEmpName }} {{ data.sponsorFullName ? `【${data.sponsorFullName}】` : '' }}
      </a-col>
      <a-col :span="12">
        当前状态: {{ data.state ? data.state.msg : '' }}
      </a-col>
      <a-col :span="12">
        主播抖音ID: {{ data.tiktokCode }}
      </a-col>
      <a-col :span="12">
        主播真实姓名: {{ data.realName }}
      </a-col>
      <a-col :span="12">
        激活后运营人: {{ data.operatorEmpName }}{{ data.afterOperationFullName ? `【${data.afterOperationFullName}】` : '' }}
      </a-col>
    </a-row>
    <modal-table :data="data.approveModels"/>
  </a-modal>
</template>

<script>
import modalTable from './modalTable'
import { applyDetail } from '@/api/actived'
import { artistSearch2 } from '@/api/gold'
import searchEmployee from '../../components/searchEmployee'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      artistSearch2,
      confirmLoading: false,
      visibleModal: false,
      data: {}
    }
  },

  components: {
    searchEmployee,
    modalTable
  },

  mounted () {},

  methods: {
    cancel () {
      this.$emit('cancel')
    },
    getDetail () {
      applyDetail(this.id).then(res => {
        this.data = res
      })
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.getDetail()
        } else {
          this.data = {}
        }
        this.visibleModal = val
      },
      immediate: true
    }
  }
}

</script>
<style lang='less' scoped>
.modal-tip{
  color:#DC0D0D;
  line-height: 22px;
  padding-left: 20px;
}
</style>
