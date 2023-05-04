<template>
  <a-modal
    :width="800"
    :visible="visibleModal"
    title="处理仲裁"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    @cancel="cancel"
    @ok="submit"
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
      <a-col :span="12" class="acitve-blue" v-if="data.operatorEmpNameOrg">
        激活前运营人: {{ data.operatorEmpNameOrg }}{{ data.orgOperationFullName ? `【${data.orgOperationFullName}】` : '' }}
      </a-col>
      <a-col :span="12" class="acitve-blue">
        激活后运营人: {{ data.operatorEmpName }}{{ data.afterOperationFullName ? `【${data.afterOperationFullName}】` : '' }}
      </a-col>
    </a-row>
    <modal-table :data="data.approveModels"/>
    <template slot="footer">
      <a-button class="footer-btn none" :loading="loading1" @click="submit(false, 'loading1')">驳回</a-button>
      <a-button class="footer-btn" :loading="loading2" type="primary" @click="submit(true, 'loading2')">通过</a-button>
    </template>
  </a-modal>
</template>

<script>
import modalTable from './modalTable'
import { applyDetail, dealList } from '@/api/actived'
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
      loading1: false,
      loading2: false,
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
    },
    submit (val, text) {
      this[text] = true
      dealList({
        id: this.id,
        state: val
      }).then(res => {
        this[text] = false
        this.$message.success('操作成功')
        this.$emit('cancel')
        this.$parent.$refs.table.refresh()
      }).catch(() => {
        this[text] = false
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
.footer-btn{
  &.none{
    background-color: #FDEDED!important;
    border-color: #FDEDED!important;
    color: #DC0D0D!important;
  }
}
.acitve-blue{
  color: #755DD7;
}
</style>
