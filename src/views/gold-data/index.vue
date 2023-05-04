<template>
  <div class="container">
    <div class="search-content">
      <div class="top-title">输入抖音号/火山号，查看主播的基本信息</div>
      <div class="search-bar">
        <!-- <div class="label">
          抖音号/火山号
        </div> -->
        <div class="right-con">
          <span class="icon"></span>
          <a-input class="search-input" v-model="keyword" @pressEnter="searchHandle" placeholder="请输入抖音号/火山号" />
        </div>
        <a-button type="primary" class="btn-search" @click="searchHandle">搜索</a-button>
      </div>
      <a-spin :spinning="loading" style="width:100%">
      </a-spin>
      <div class="result-con">
        <a-table
          v-if="list.length > 0"
          ref="table"
          row-key="agentName"
          :columns="columns"
          :data-source="list"
          :pagination="false"
        >
          <div slot="nickName" slot-scope="text, record">
            <div class="flex-box">
              <div class="box-item">
                <p>{{ record.nickName }}</p>
                <p>抖音号: {{ record.tikTokCode }}</p>
                <p>抖音号(原): {{ record.tikTokCodeOrig }}</p>
                <p>火山号: {{ record.volcanoCode }}</p>
              </div>
            </div>
          </div>
          <template slot="operateDepartName" slot-scope="text">
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{ text }}</span>
              </template>
              <div class="table-struc-con">
                {{ text || '-' }}
              </div>
            </a-tooltip>
          </template>
          <template slot="agentEmployeeDepartmentFullName" slot-scope="text">
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{ text }}</span>
              </template>
              <div class="table-struc-con">
                {{ text || '-' }}
              </div>
            </a-tooltip>
          </template>
          <template slot="videoDepartName" slot-scope="text">
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{ text }}</span>
              </template>
              <div class="table-struc-con">
                {{ text || '-' }}
              </div>
            </a-tooltip>
          </template>
          <div slot="action" slot-scope="text, record">
            <a-button type="link" @click="toGoldData(record)" v-if="permission.includes('artists_operation_gold_data_complete')">填写关系</a-button>
            <a-button type="link" class="ml10" @click="toApply(record)" v-if="record.activeApply && permission.includes('activity_apply_search')">激活申请</a-button>
          </div>
        </a-table>
      </div>
    </div>
  </div>
  <!-- <div class="container">
    <div class="search-content">
      <div class="search-bar">
        <div class="label">
          抖音账号/抖音号原
        </div>
        <div class="right-con">
          <span class="icon"></span>
          <a-input class="search-input" v-model="keyword" @pressEnter="searchHandle" placeholder="请输入抖音账号" />
        </div>
      </div>
      <a-spin :spinning="loading" style="width:100%">
      </a-spin>
      <div class="result-con">
        <ul v-if="list.length!=0">
          <li v-for="li in list" :key="li.influencerId" @click="toDetail(li)">
            <div class="item info">
              <span class="name">{{ li.nickname }}</span>
            </div>
            <span class="item">抖音号：{{ li.newTrillNumber ? li.newTrillNumber : '-' }}</span>
            <span class="item">抖音号(原): {{ li.oldTrillNumber ? li.oldTrillNumber : '-' }}</span>
            <span class="item">火山号: {{ li.newVolcanoNumber ? li.newVolcanoNumber : '-' }}</span>
          </li>
        </ul>
      </div>
    </div>
    <a-modal
      title="登录"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-input v-model="phone" placeholder="手机号" style="margin-bottom:10px"></a-input>
      <a-input v-model="code" placeholder="验证码"></a-input>
    </a-modal>
    <div class="icon-con icon-1"></div>
    <div class="icon-con icon-2"></div>
    <div class="icon-con icon-3"></div>
    <div class="icon-con icon-4"></div>
    <div class="icon-con icon-5"></div>
    <div class="icon-con icon-6"></div>
  </div> -->
</template>

<script>
import { mapGetters } from 'vuex'
import { search, login } from '@/api/goldData'
const columns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 180
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    customRender: (text, record) => {
      return text || '-'
    }
  },
  {
    title: '招募',
    dataIndex: 'recruitName',
    customRender: (text, record) => {
      return text || '-'
    },
    width: 100
  },
  {
    title: '讲师',
    dataIndex: 'lecturerRecruitName',
    customRender: (text, record) => {
      return text || '-'
    }
  },
  {
    title: '签约人',
    dataIndex: 'signedEmployeeName',
    customRender: (text, record) => {
      return text || '-'
    }
  },
  {
    title: '绑定状态',
    dataIndex: 'signedEmployeeName',
    customRender: (text, record) => {
      return text || '-'
    }
  },
  {
    title: '待绑定运营',
    dataIndex: 'agentEmployeeName',
    customRender: (text, record) => {
      return text || '-'
    }
  },
  {
    title: '待绑定运营所属组织',
    dataIndex: 'agentEmployeeDepartmentFullName',
    scopedSlots: { customRender: 'agentEmployeeDepartmentFullName' }
  },
  {
    title: '直播运营',
    dataIndex: 'operateName',
    customRender: (text, record) => {
      return text || '-'
    },
    width: 100
  },
  {
    title: '直播运营所属组织',
    dataIndex: 'operateDepartName',
    scopedSlots: { customRender: 'operateDepartName' }
  },
  {
    title: '短视频运营',
    dataIndex: 'videoName',
    customRender: (text, record) => {
      return text || '-'
    },
    width: 120
  },
  {
    title: '短视频运营所属组织',
    dataIndex: 'videoDepartName',
    scopedSlots: { customRender: 'videoDepartName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 200
  }
]
export default {
  name: 'Dashbord',
  data () {
    return {
      keyword: '',
      list: [],
      visible: false,
      phone: '',
      code: '',
      loading: false,
      columns
    }
  },
  mounted () {
  },
  methods: {
    handleOk () {
      const pamars = {
        phone: this.phone,
        code: this.code
      }
      login(pamars).then(res => {
        this.visible = false
      })
    },
    handleCancel () {
      this.visible = false
    },
    searchHandle () {
      this.list = []
      this.loading = true
      search(this.keyword).then(res => {
        this.list = res
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    },
    toGoldData (li) {
      if (li.isVideor && !li.operateName) {
        this.$notification['error']({
          message: '错误',
          description: '请先完善主播信息',
          duration: 4
        })
      } else {
        this.$router.push({
          path: '/artists-operation/gold-data/detail',
          query: {
            id: li.tiktokLiveInfoId
          }
        })
      }
    },
    toApply (li) {
      const params = {
        ...li,
        id: li.tiktokLiveInfoId
      }
      this.$router.push({
        path: '/artists-operation/gold-data/active',
        query: {
          info: JSON.stringify(params)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
.search-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 88vh;
  background-color: #fff;
  padding-top: 76px;
  .top-title {
    font-size: 20px;
    color: rgba(0,0,0,.85);
    text-align: center;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .search-bar {
    display: flex;
    align-items: center;
    width: 560px;
    margin: 0 auto;
    height: 60px;
    background-color: #fff;
    border-radius: 2px;
    // border: solid 1px #E9E9E9;
    .label {
      width: 222px;
      line-height: 60px;
      border: solid 1px #E9E9E9;
      font-size: 14px;
      color: #755DD7;
      text-align: center;
    }
    .btn-search {
      position: relative;
      width: 100px;
      height: 62px;
      font-size: 16px;
      left: -1px;
    }
    .right-con {
      flex: 1;
      padding-right: 24px;
      padding-left: 5px;
      height: 62px;
      padding-top: 14px;
      border: solid 1px #E9E9E9;
      // .icon {
      //   float: left;
      //   margin-top: 9px;
      //   margin-right: 6px;
      //   width: 16px;
      //   height: 16px;
      //   background: url('../../assets/icon_search.png');
      //   background-size: 100% 100%;
      // }
      .search-input {
        width: 90%;
        border: 0;
        outline: none !important;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
  .result-con {
    padding: 0 8%;
    margin: 20px auto;
    ul {
      box-shadow: 0px 0px 8px 2px rgba(219, 219, 219, 0.3);
      border-radius: 2px;
      width: 760px;
      margin: 0 auto;
      padding: 0;
      &:hover {
        box-shadow: 0px 0px 8px 2px rgba(250, 173, 20, 0.3);
      }
      li {
        display: flex;
        padding: 35px 24px;
        align-items: center;
        cursor: pointer;
        .item {
          flex: 1;
          display: inline-block;
          font-size: 14px;
          // &:nth-child(1) {
          //   flex: 1.5;
          // }
        }
      }
    }
  }
}
</style>
