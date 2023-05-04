<template> <div>
  <page-header-wrapper class="container">
    <div class="content">
      <s-table
        row-key="id"
        :columns="columns"
        :data="getLogsHandle"
        :showPagination="true"
      >
        <span
          slot="type"
          slot-scope="row"
        >
          <template v-if="row.type===1">
            系统有Bug
          </template>
          <template v-if="row.type===2">
            我要吐槽
          </template>
          <template v-if="row.type===3">
            提个建议
          </template>
        </span>
        <span
          slot="feedbackInfo"
          slot-scope="text"
        >
          <ellipsis
            :length="60"
            tooltip
          >{{ text.feedbackInfo }}</ellipsis>
        </span>
        <span
          slot="feedbackPicture"
          slot-scope="row"
        >
          <a-button
            v-if="row.feedbackPicture"
            type="link"
            @click="detailHandle(row)"
          >查看</a-button>
          <a-button
            v-else
            type="link"
          ></a-button>
        </span>
      </s-table>
    </div>
  </page-header-wrapper>

  </viewer>
  <a-modal v-model="visible" title="图片预览" @ok="handleOk">
    <viewer
      v-if="anchorPicture"
      :images="anchorPicture"
      class="img-viewer"
    >
      <div class="images">
        <img
          v-for="(src,dataIndex) in anchorPicture"
          :src="src"
          :key="dataIndex"
          class="imgs"
        >
      </div>
    </viewer>
  </a-modal>
</div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { feedbacklist } from '@/api/feedback'

const columns = [
  {
    title: '问题描述',
    scopedSlots: { customRender: 'feedbackInfo' }
  },
  {
    title: '问题类型',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '提交人',
    dataIndex: 'name'
  },
  {
    title: '提交时间',
    dataIndex: 'feedbackTime'
  },
  {
    title: '浏览器环境',
    dataIndex: 'browserEnvironment'
  },
  {
    title: '图片附件',
    scopedSlots: { customRender: 'feedbackPicture' }
  }
]

export default {
  name: 'Log',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      columns: columns,
      visible: false,
      superId: 0,
      loading: ' ',
      anchorPicture: ''
    }
  },
  mounted () {
    this.getLogsHandle()
  },
  methods: {
    // 迪耐吉查看图片
    detailHandle (text) {
      if (text.feedbackPicture === '') {
        this.visible = false
        this.$message.error('暂无图片')
      } else {
      const arr = []
      this.visible = true
      text.feedbackPicture.split(',').forEach(function (item) {
      arr.push(`${process.env.VUE_APP_API_BASE_URL}${item}`)
      })
       this.anchorPicture = arr
      }
    },
    getLogsHandle (parameter) {
      return feedbacklist(parameter).then(res => {
        return res
      })
    },
       handleOk (e) {
        this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  /deep/ .ant-pro-page-header-wrap-page-header-warp {
    .ant-breadcrumb {
      display: none;
    }
  }
}
.img-viewer {
  img {
    display: inline-block;
    width: 50px;
    height: auto;
    cursor: pointer;
  }
}
.imgs{
  margin-right:10px;
}
</style>
