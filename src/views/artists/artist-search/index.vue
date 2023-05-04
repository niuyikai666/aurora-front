<template>
  <div class="container">
    <div class="search-content">
      <div class="top-title">输入抖音号/火山号，查看主播的基本信息</div>
      <div class="search-bar">
        <div class="right-con">
          <span class="icon"></span>
          <a-input class="search-input" v-model="keyWord" @pressEnter="searchHandle" placeholder="请输入抖音号/火山号" />
        </div>
        <a-button type="primary" class="btn-search" @click="searchHandle">搜索</a-button>
      </div>
      <div class="result-con">
        <a-table
          v-if="dataSource.length > 0"
          ref="table"
          row-key="agentName"
          :columns="columns"
          :data-source="dataSource"
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
                {{ text|| '-' }}
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
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { anchorSearch } from '@/api/artists'

export const columns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' }
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
    }
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
    title: '直播运营',
    dataIndex: 'operateName',
    customRender: (text, record) => {
      return text || '-'
    }
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
    }
  },
  {
    title: '短视频运营所属组织',
    dataIndex: 'videoDepartName',
    scopedSlots: { customRender: 'videoDepartName' }
  }
]

export default {
  name: 'ArtistSearch',
  data () {
    return {
      keyWord: '',
      columns,
      dataSource: []
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      anchorSearch({
        searchName: this.keyWord
      }).then(res => {
        this.dataSource = []
        this.$nextTick(() => {
          this.dataSource = res
        })
      })
    },

    searchHandle () {
      if (this.keyWord.trim() === '') return
      this.getData()
    }
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
      &:focus-within{
        border-color: #755DD7;
      }
      &:hover{
        border-color: #755DD7;
      }
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
    margin-top: 45px;
  }
}
</style>
