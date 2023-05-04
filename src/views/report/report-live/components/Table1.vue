<template>
  <div>
    <s-table
      class="my-table"
      ref="table"
      row-key="id"
      :columns="columns"
      :data="getData"
      :scroll="{x: 2200}"
    >
      <div slot="nickName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <p>{{ record.nickName }}</p>
            <a-tooltip placement="top">
              <template slot="title">
                <dl style="margin-bottom:0;">
                  <dd>抖音号: {{ record.tikTokCode || '' }}</dd>
                  <dd>抖音号(原): {{ record.tikTokCodeOrig || '' }}</dd>
                  <dd>火山号: {{ record.volcanoCode || '' }}</dd>
                  <dd>火山号(原): {{ record.volcanoCodeOrig || '' }}</dd>
                </dl>
              </template>
              <p>抖音号: {{ record.tikTokCode || '' }}</p>
            </a-tooltip>
          </div>
        </div>
      </div>
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
      <template slot="operatorName" slot-scope="text, record">
        <a-tooltip placement="top">
          <template slot="title">
            <dl style="margin-bottom:0;">
              <dd v-if="record.departmentName">小组：{{ record.departmentName }}</dd>
              <dd>分公司：{{ record.companyName }}</dd>
            </dl>
          </template>
          <span>{{ record.operatorName }}</span>
        </a-tooltip>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button @click="handleDetail(record.id)" type="link">查看</a-button>
      </template>
    </s-table>
    <detail-comp :visible="visible" :id="artistId" :params="params" :downloadPermmison="downloadPermmison" @close="handleClose" />
  </div>
</template>

<script>
import { numberFormat } from '@/utils/util'
import { STable } from '@/components'
import { columns } from '../tableColumns'
import DetailComp from './DetailComp.vue'

export default {
  name: 'ToalComp1',
  props: {
    params: {
      type: Object,
      default: null
    },
    func: {
      type: Function,
      default: null
    },
    downloadPermmison: {
      type: Boolean,
      default: false
    }
  },
  components: {
    STable,
    DetailComp
  },
  data () {
    return {
      numberFormat,
      columns,
      visible: false,
      artistId: null
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, parameter, this.params || {})
      return this.func(requestParameters).then(res => {
        return res
      })
    },
    handleDetail (id) {
      this.artistId = id
      this.visible = true
    },
    handleClose () {
      this.artistId = null
      this.visible = false
    },
    dataFormat (value) {
      return `${numberFormat(value, true, 1)}${ value > 10000 ? '万' : ''}`
    }
  },
  watch: {
    params: {
      handler (val) {
        this.$refs.table.refresh(true)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  .tips {
    color: #ff4d4f;
  }
</style>
