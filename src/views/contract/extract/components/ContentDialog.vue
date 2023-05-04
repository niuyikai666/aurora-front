<template>
  <a-drawer
    class="drawer"
    title="内容查看"
    :width="700"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="cancelHandle"
  >
    <div>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        row-key="id"
      >
        <template slot="cloum" slot-scope="text, record">
          {{ labelData[record.cloum] }}
        </template>
        <template slot="content" slot-scope="text, record">
          <div v-if="record.cloum === 'pbIdCardFront' || record.cloum === 'pbIdCardBack' || record.cloum === 'pbIdCardHold'">
            <img
              v-if="record.content"
              style="cursor:pointer;"
              width="100"
              class="picture"
              :src="baseUrl + record.content"
              @click="handlePreview(baseUrl + record.content)">
          </div>
          <div v-if="record.cloum === 'index' || record.cloum === 'content' || record.cloum === 'tail'">
            <a-button v-if="record.content" type="link" @click="seeHandle(baseUrl + record.content)">查看</a-button>
          </div>
          <div v-if="record.cloum === 'isMinReward'">
            <a-button v-if="record.isMinContent && record.isMinContent.length > 0" type="link" @click="seeGurantHandle(record.isMinContent)">查看</a-button>
            <span v-if="record.isMinContent && record.isMinContent.length <= 0">否</span>
          </div>
          <div v-if="record.cloum !== 'pbIdCardFront' && record.cloum !== 'pbIdCardBack' && record.cloum !== 'pbIdCardHold' && record.cloum !== 'index' && record.cloum !== 'content' && record.cloum !== 'tail' && record.cloum !== 'isMinReward'">
            {{ record.content }}
          </div>
        </template>
      </a-table>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img style="width: 100%" :src="previewImage" />
      </a-modal>
      <a-modal :width="700" :visible="minRewardVisible" :footer="null" @cancel="handleCancel">
        <guarant v-if="guaranteedData.length > 0" :data="guaranteedData" :disable="true"/>
      </a-modal>
      <PDF v-if="pdfUrl" :pdfurl="pdfUrl" @closepdf="closePdfHandle" />
    </div>
  </a-drawer>
</template>

<script>
import { extractContent } from '@/api/contract'
import { labelData } from '../labels'
import PDF from '@/components/PDF'
import Guarant from '../../manage/extra/components/Guarant.vue'

const columns = [
  {
    title: '字段名称',
    dataIndex: 'cloum',
    scopedSlots: { customRender: 'cloum' },
    width: 150
  },
  {
    title: '具体内容',
    dataIndex: 'content',
    scopedSlots: { customRender: 'content' },
    width: 180
  },
  {
    title: '信息来源',
    dataIndex: 'source'
  }
]

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: [Number, String],
      default: ''
    }
  },
  components: {
    PDF,
    Guarant
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      columns,
      dataSource: [],
      labelData,

      previewVisible: false,
      previewImage: '',

      pdfUrl: '',

      minRewardVisible: false,
      guaranteedData: []
    }
  },
  mounted () {
    if (this.id === '') return false
  },
  methods: {
    extractContentHandle () {
      extractContent(this.id).then(res => {
        res.forEach(item => {
          item['id'] = Math.random(100) * 100
        })
        this.dataSource = res
      })
    },
    handlePreview (url) {
      this.previewImage = url
      this.previewVisible = true
    },
    seeHandle (url) {
      const type = url.split('.')[1]
      if (type === 'pdf') {
        this.pdfUrl = url
      } else {
        this.previewImage = url
        this.previewVisible = true
      }
    },
    seeGurantHandle (data) {
      if (!data) return
      const newData = JSON.parse(JSON.stringify(data))
      this.guaranteedData = this.generateGuarant(newData)
      this.$nextTick(() => {
        this.minRewardVisible = true
      })
    },
    generateGuarant (data) {
      data.forEach(item => {
        item.dateType = item.dateType.code
        item.type = item.type.code
      })

      return data
    },
    handleCancel () {
      this.previewVisible = false
      this.minRewardVisible = false
      this.guaranteedData = []
    },
    closePdfHandle () {
      this.pdfUrl = ''
    },
    cancelHandle () {
      this.dataSource = []
      this.$emit('cancel')
    },
    confirmHandle () {
      this.$emit('confirm')
    }
  },
  watch: {
    id (val) {
      if (val) {
        this.extractContentHandle()
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-modal-body {
  padding-top: 18px;
  .box {
    padding-bottom: 0;
    &:first-child {
      margin-top: 30px;
    }
    .ant-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
