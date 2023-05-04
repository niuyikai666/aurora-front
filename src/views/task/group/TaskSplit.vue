<template>
  <div class="top-container" style="padding-bottom:24px;">
    <div class="inner-content" style="padding: 18px 24px;">
      <div class="control-bar" style="margin-bottom:10px;">
        <span class="title">基本信息</span>
      </div>
      <a-form layout="inline" class="form">
        <a-form-item label="名称">
          <span>{{ taskModel.name }}</span>
        </a-form-item>
        <a-form-item label="任务时间">
          <span>{{ taskModel.startDate }} - {{ taskModel.endDate }}</span>
        </a-form-item>
        <a-form-item label="业务线">
          <span>{{ taskModel.serviceLine ? taskModel.serviceLine.msg : '' }}</span>
        </a-form-item>
        <a-form-item label="分类">
          <span>{{ taskModel.category ? taskModel.category.msg : '' }}</span>
        </a-form-item>
      </a-form>
    </div>
    <div class="inner-content" style="margin-top:24px;">
      <div class="group-name">{{ departmentName }}</div>
      <split-comp :dataItem="releaseStatic" :tableHeader="tableHeader" :edit="false" />
      <split-comp :dataItem="splitStatic" :tableHeader="tableHeader" :edit="false" />
      <div class="button-con">
        <a-button type="primary" style="margin-top:24px;" @click="setAverageHandle()">平均分配</a-button>
      </div>
      <split-comp v-for="(item, index) in splitData" :key="index" :dataItem="item" :tableHeader="tableHeader" />
    </div>
    <div class="footer-bar">
      <a-button type="primary" @click="manageConfirmHandle()">确认拆分</a-button>
    </div>
  </div>
</template>

<script>
import SplitComp from '../components/SplitComp'
import { getGroupBaseInfo, getGroupStatic, getGroupMembers, groupSplitConfirm } from '@/api/task'

export default {
  name: 'TaskManage',
  components: {
    SplitComp
  },
  data () {
    return {

      taskModel: {},
      splitData: [],
      releaseStatic: {},
      splitStatic: {},
      tableHeader: [],
      saved: false,

      departmentId: '',
      departmentName: '',

      averageData: []
    }
  },
  mounted () {
    this.getTaskInfoHandle()
  },
  methods: {
     // 计算总计平均值
    averageOriginHandle (data) {
      const newData = JSON.parse(JSON.stringify(data))
      newData.forEach(item => {
        item.forEach(it => {
          it.startLine = Math.ceil(it.startLine / this.splitData.length)
        })
      })
      this.averageData = newData
    },

    // 设置分组平均值
    setAverageHandle () {
      this.splitData.forEach(item => {
        item.stages = this.setAverage(item.stages)
      })
    },
    setAverage (data) {
      data.forEach((item, index) => {
        item.forEach((it, idx) => {
          it.startLine = this.averageData[index][idx].startLine
        })
      })

      return data
    },

    getTaskInfoHandle () {
      getGroupBaseInfo(this.$route.query.id).then(res => {
        this.tableHeader = this.generateTableHeader(res.targetMap)
        this.departmentId = res.departmentId
        this.departmentName = res.departmentName
        this.missionConfigId = res.missionConfigId
        this.taskModel = res
        this.$nextTick(() => {
          this.getManageStatic()
        })
      })
    },
    getManageStatic () {
      getGroupStatic(this.$route.query.id).then(res => {
        if (res.releaseModel) {
          res.releaseModel.title = '下发总计'
          this.releaseStatic = res.releaseModel
        }
        if (res.splitModel) {
          res.splitModel.title = '拆分总计'
          this.splitStatic = res.splitModel
        }
        this.getGroupInfoHandle()
      })
    },
    generateTableHeader (data) {
      const arr = []
      data.forEach(item => {
        arr.push(item.value)
      })
      return arr
    },
    getGroupInfoHandle () {
      getGroupMembers(this.$route.query.id, this.departmentId).then(res => {
        this.splitData = res
        this.$nextTick(() => {
          this.averageOriginHandle(this.releaseStatic.stages)
        })
      })
    },

    manageConfirmHandle () {
      groupSplitConfirm({
        id: this.$route.query.id,
        missionConfigId: this.missionConfigId,
        list: this.splitData
      }).then(() => {
        this.$message.success('拆分成功！')
        this.$router.push({
          path: `/task/group/list`
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .footer-bar {
    position: fixed;
    background-color: #fff;
    padding: 16px 24px;
    text-align: right;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
  .search-content{
    .ant-form-item {
      min-width: 400px;
    }
  }

  .group-name {
    font-size: 16px;
    color: #262626;
    font-weight: 700;
  }

  .total-content {
    /deep/ .t-name {
      margin-top: 0;
    }
  }

  .inner-content {
    /deep/ .ant-card-body {
      padding: 0;
    }
    /deep/ .ant-card-head {
      padding: 0;
    }
  }

  .form {
    .ant-select {
      width: 320px;
    }
    .ant-form-item {
      margin: 6px 0px 0 0;
      width: 25%;
      .ant-form-item-children {
        input,
        .ant-calendar-picker {
          width: 320px;
        }
      }
    }
    /deep/ .ant-form-item {
      .ant-cascader-input.ant-input{
        width: 320px;
      }
      &.cate {
        .ant-form-item-label {
          width: 70px;
        }
      }
    }
  }

  .opt-con .btn {
    margin: 0 10px;
  }
</style>
