<template>
  <div class="container">
    <div class="search-content">
      <div class="top-title">请填写主播抖音号信息</div>
      <div class="search-bar">
        <div class="right-con">
          <span class="icon"></span>
          <a-input class="search-input" v-model="code" @pressEnter="searchHandle" placeholder="请输入抖音号" :maxLength="30"/>
        </div>
        <a-button type="primary" class="btn-search" @click="searchHandle">下一步</a-button>
      </div>
      <div style="width:560px;margin:0 auto;" class="warning">
        *抖音号是系统识别的唯一标识，请您务必准确填写
      </div>
    </div>
  </div>
</template>

<script>
import { searchAccount } from '@/api/pre-filled'

export default {
  name: 'ArtistSearch',
  data () {
    return {
      code: '',
      dataSource: []
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      searchAccount({
        code: this.code
      }).then(res => {
        if (res.EXIST_AND_MODIFIABLE) {
          this.$confirm({
            title: '提示',
            content: `当前主播信息已存在，是否修改?`,
            okText: '去修改',
            onOk: () => {
              const id = res.TIKTOK_LIVE_INFO_ID
              this.$router.push({
                path: '/artists-operation/gold-data/detail',
                query: {
                  id
                }
              })
            },
            onCancel () {
            }
          })
        } else {
          this.$router.push({
            path: '/artists/pre-filled/edit',
            query: {
              code: this.code
            }
          })
        }
      })
    },

    searchHandle () {
      if (this.code.trim() === '') return
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
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
    margin-top: 45px;
  }
}
.radio-wraper{
  display:flex;
  justify-content:center;
  margin-bottom:10px;
}
</style>
