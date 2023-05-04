<template>
  <div style="position:relative">
    <div class="top-bar">
      <div class="title-con">
        <div class="title">拉新任务-2022年后入会主播</div>
        <div class="crip">数据截止至{{ endTime || '--' }}</div>
        <rule-comp />
      </div>
      <div class="sub-title">拉新任务周期共计3个周期，按照“首播第1-30天”、“首播第31-60天”、“首播第61-90天”，主播流水不同档位，给予差异化提成比例奖励</div>
    </div>
    <div style="margin-top: 24px;">
      <total-manage-comp @getTime="getTimeHandle" :func="getNewTaskCompanyTotal" :type="2" ref="comp"/>
    </div>
    <div style="margin-top: 24px;">
      <show-comp :tableFunc="getNewTaskCompanyList" :tabFunc="getNewTaskCompanyTabCount" :downUrl="downloadUrl" />
    </div>
    <a-modal
      title="导入"
      :visible="visible"
      @cancel="cancel"
      @ok="submit"
      ok-text="开始计算"
      :confirm-loading="confirmLoading"
    >
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="月份">
          <a-month-picker
            v-model="date"
            :allowClear="true"
            value-format="YYYY-MM"
            placeholder="选择月"
          />
        </a-form-item>
        <a-form-item label="结算单">
          <div>
            <a-button class="relative">
              <a-icon type="upload" /> 上传
              <input type="file" class="upload-input" @change="uploadChange"/>
            </a-button>
          </div>
          <div v-if="file">
            <span class="upload-text">{{ file.name }}</span> <a-icon type="delete" class="del-upload" @click="file = ''"/>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import TotalManageComp from './components/TotalManageComp'
import StaticComp from './components/StaticComp'
import ShowComp from './components/ShowComp'
import RuleComp from './components/RuleComp'
import { getNewTaskCompanyList, getNewTaskCompanyTabCount, getNewTaskCompanyTotal, caculateReward } from '@/api/task'

export default {
  name: 'Salary',
  components: {
    TotalManageComp,
    StaticComp,
    ShowComp,
    RuleComp
  },
  data () {
    return {
      getNewTaskCompanyList,
      getNewTaskCompanyTabCount,
      getNewTaskCompanyTotal,
      downloadUrl: '/lachine/company/list/export',
      endTime: '',
      confirmLoading: false,
      visible: false,
      date: '',
      file: ''
    }
  },
  mounted () {
  },
  methods: {
    getTimeHandle (time) {
      this.endTime = time
    },
    showModal () {
      this.date = ''
      this.file = ''
      this.visible = true
    },
    cancel () {
      this.visible = false
    },
    submit () {
      // 刷新数据
      if (!this.date) {
        this.$message.error('请选择月份')
        return
      }
      if (!this.file) {
        this.$message.error('请上传结算单')
        return
      }
      this.confirmLoading = true
      const formData = new FormData()
      formData.append('file', this.file)
      caculateReward({
        monthCycle: this.date
      }, formData).then(res => {
        this.$notification['success']({
          message: '提示',
          description: '操作成功',
          duration: 2
        })
        this.$refs.comp.getData()
        this.confirmLoading = false
        this.visible = false
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    uploadChange (e) {
      this.file = e.target.files[0]
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-import{
    position: absolute;
    right: 24px;
    top: 24px;
  }
  .upload-input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
  }
  .del-upload{
    display: inline-block;
    margin-left: 5px;
    &:hover{
      color: #755dd7;
    }
  }
</style>
