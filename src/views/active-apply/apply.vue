<template>
  <div class="container">
    <div class="search-content">
      <div class="top-title">输入抖音号/火山号，进行断播主播激活申请</div>
      <div class="search-bar">
        <div class="label">
          抖音号/火山号
        </div>
        <div class="right-con">
          <span class="icon"></span>
          <a-input class="search-input" v-model="keyWord" @pressEnter="searchHandle" placeholder="请输入抖音账号" />
        </div>
      </div>
      <div class="result-con">
        <ul v-if="list.length!=0">
          <li v-for="item in list" :key="item.influencerId" @click="applyHandle(item)">
            <span class="item">昵称：{{ item.nickName }}</span>
            <span class="item">抖音号：{{ item.tiktokCode }}</span>
            <span class="item">抖音号(原): {{ item.tiktokCodeOrig }}</span>
            <span class="item">火山号: {{ item.volcanoCode }}</span>
          </li>
          <!-- <li @click="applyHandle(1)">
            <span class="item">昵称：呵呵哒</span>
            <span class="item">抖音号：呵呵哒</span>
            <span class="item">抖音号(原): 呵呵哒</span>
            <span class="item">火山号: 呵呵哒</span>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { anchorCutoffSearch } from '@/api/artists'

export default {
  name: 'ArtistSearch',
  data () {
    return {
      keyWord: '',
      list: []
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      anchorCutoffSearch({
        searchStr: this.keyWord
      }).then(res => {
        // console.log('搜索结果', res)
        this.list = res
      })
    },

    searchHandle () {
      this.getData()
    },

    applyHandle (item) {
      this.$router.push({
        path: '/artists-operation/active-apply',
        query: {
          info: JSON.stringify(item)
        }
      })
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
    width: 760px;
    margin: 0 auto;
    height: 70px;
    background-color: #fff;
    border-radius: 2px;
    border: solid 1px #E9E9E9;
    .label {
      width: 160px;
      height: 70px;
      line-height: 70px;
      border-right: solid 1px #E9E9E9;
      font-size: 14px;
      color: #755DD7;
      text-align: center;
    }
    .right-con {
      flex: 1;
      padding: 0 24px;
      .icon {
        float: left;
        margin-top: 9px;
        margin-right: 6px;
        width: 16px;
        height: 16px;
        background: url('../../assets/icon_search.png');
        background-size: 100% 100%;
      }
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
