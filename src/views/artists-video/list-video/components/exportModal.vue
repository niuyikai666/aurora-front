<template>
  <a-modal
    class="modal"
    title="导出结果"
    :width="700"
    :visible="visible"
    :footer="false"
    @cancel="onClose"
    :destroyOnClose="true"
  >
    <p class="desc">仅记录当天导入的结果，请及时下载保存</p>
    <a-table :columns="columns" :data-source="data" bordered>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" class="importing" v-if="record.processStatus.code === 0">导入中</a-button>
        <a-button type="link" @click="download(record)" v-if="record.processStatus.code === 1">导出结果</a-button>
        <a-button type="link" class="importing" v-if="record.processStatus.code === 2">导入失败</a-button>
      </span>
    </a-table>
  </a-modal>
</template>

<script>
import { getExportRecord } from '@/api/artists-video'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columns: [{
        title: '导入时间',
        dataIndex: 'uploadTime',
        scopedSlots: { customRender: 'uploadTime' }
      }, {
        title: '导入类型',
        dataIndex: 'exportType',
        customRender: (text, row) => {
          return text ? text.msg : '-'
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      }],
      importMap: {
        'WECHAT_SIGN': '签约信息',
        'WECHAT_DAILY': '主播日数据',
        'WECHAT_JOIN': '入会时间'
      },
      downMap: {
        1: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/export/info/sign`,
        2: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/export/info/daily`,
        3: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/export/info/join`
      },
      data: []
    }
  },

  components: {},

  mounted () {
    // this.getData()
  },

  methods: {
    onClose () {
      this.$emit('cancel')
    },
    getData () {
      getExportRecord().then(res => {
        this.data = res.models
      })
    },
    download (value) {
      const url = this.downMap[value.exportType.code]
      window.location.href = url + `?uploadCode=${value.uploadCode}`
      // const downMap = {
      //   1:
      // }
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.getData()
        }
      },
      immediate: true
    }
  }
}

</script>
<style lang='less' scoped>
.desc{
  margin:0 0 24px 0;
  font-size: 14px;
  color: #755DD7;
}
.importing{
  color: #9C9C9C!important;
}
</style>
