<template>
  <a-modal
    title="数据明细"
    :width="1200"
    :visible="visible"
    @cancel="closeHandle"
  >
    <template slot="footer">
      <a-button
        key="create"
        type="primary"
        @click="closeHandle"
      >确定</a-button>
    </template>
    <div class="con">
      <div style="text-align: right; margin-bottom:24px;">
        <a-button v-if="downloadPermmison" type="primary" icon="download" @click="exportHandle">
          导出
        </a-button>
      </div>
      <s-table
        v-if="visible && id"
        class="my-table"
        ref="table"
        row-key="dateTime"
        :columns="columns"
        :data="getData"
      >
        <template slot="reward" slot-scope="text, record">
          <ul style="padding-left: 0;">
            <li>直播:{{ dataFormat(record.liveReward) }}</li>
            <li>道具:{{ dataFormat(record.propReward) }}</li>
            <!-- <li>总计:{{ dataFormat((record.liveReward + record.propReward).toFixed(2)) }}</li> -->
            <li>嘉宾:{{ dataFormat(record.guestReward) }}</li>
            <li>总计:{{ dataFormat((record.totalReward).toFixed(2)) }}</li>
          </ul>
        </template>
        <template slot="effectDays" slot-scope="text, record">
          <ul style="padding-left: 0;">
            <li>总计:{{ dataFormat(record.effectiveDays) }}</li>
            <li>语音:{{ dataFormat(record.voiceEffectDays) }}</li>
            <li>视频多人:{{ dataFormat(record.videoEffectDays) }}</li>
          </ul>
        </template>
        <template slot="liveTime" slot-scope="text, record">
          <ul style="padding-left: 0;">
            <li>总时长:{{ dataFormat(record.liveBroadcastDuration) }}</li>
            <li>有效时长:{{ dataFormat(record.effectLiveDuration) }}</li>
          </ul>
        </template>
        <template slot="videoReward" slot-scope="text, record">
          <ul style="padding-left: 0;">
            <li>总流水(元):{{ dataFormat(record.videoReward) }}</li>
            <li>总时长(小时):{{ dataFormat(record.videoDuration) }}</li>
            <li>有效时长(小时):{{ dataFormat(record.videoEffectDuration) }}</li>
          </ul>
        </template>
        <template slot="voiceReward" slot-scope="text, record">
          <ul style="padding-left: 0;">
            <li>流水(元):{{ dataFormat(record.voiceReward) }}</li>
            <li>总时长(小时):{{ dataFormat(record.voiceDuration) }}</li>
            <li>有效时长(小时):{{ dataFormat(record.voiceEffectDuration) }}</li>
          </ul>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-button @click="handleDetail(record.id)" type="link">查看</a-button>
        </template>
      </s-table>
    </div>
  </a-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import qs from 'qs'
import { numberFormat } from '@/utils/util'
import { STable } from '@/components'
import { columnsDetail } from '../tableColumns'
import { getReportLiveListDetail } from '@/api/report'

export default {
  components: {
    STable
  },
  props: {
    visible: {
      type: Boolean,
      default: () => false
    },
    id: {
      type: [Number, String],
      default: null
    },
    params: {
      type: Object,
      default: null
    },
    downloadPermmison: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      numberFormat,
      columns: columnsDetail
    }
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, parameter, {
        id: this.id,
        startDate: this.params.startDate,
        endDate: this.params.endDate
      })
      return getReportLiveListDetail(requestParameters).then(res => {
        return res
      })
    },
    closeHandle () {
      this.$emit('close')
    },
    exportHandle () {
      const params = {
        id: this.id,
        startDate: this.params.startDate,
        endDate: this.params.endDate
      }
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/tiktok/live/info/detail/export?${qs.stringify(params)}`
    },
    dataFormat (value) {
      return `${numberFormat(value, true, 1)} ${ value > 10000 ? '万' : ''}`
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },

  watch: {
  }
}
</script>

<style lang="less" scoped>
</style>
