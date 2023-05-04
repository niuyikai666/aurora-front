<template>
  <div>
    <s-table
      ref="table"
      v-if="tabType === 5"
      rowKey="tiktokLiveInfoId"
      :columns="columns"
      :data="getData"
      @expand="expand"
      :expandedRowKeys="expandedRowKeys"
      :scroll="{x: 2800}"
    >
      <span slot="name" slot-scope="index, record">
        <div class="flex-box">
          <div class="box-item">
            <p>{{ record.nickname }}</p>
            <p>抖音号: {{ record.tiktokCode }}</p>
            <p>抖音号原: {{ record.tiktokCodeOrig }}</p>
          </div>
        </div>
      </span>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-table :columns="finishedChildColunm" :data-source="record.arr" :loading="record.loading" :pagination="false">
          <template slot="reward" slot-scope="text">
            <span :class="{tips: text > 1330000}">{{ amountFormat(text, true, 1) }}元</span>
          </template>
        </a-table>
      </p>
    </s-table>
    <s-table
      ref="table"
      v-else
      :row-key="(item, index) => index"
      :columns="columns"
      :data="getData"
      @expand="expand"
      :scroll="{x: 2800}"
    >
      <span slot="name" slot-scope="index, record">
        <div class="flex-box">
          <div class="box-item">
            <p>{{ record.nickname }}</p>
            <p>抖音号: {{ record.tiktokCode }}</p>
            <p>抖音号原: {{ record.tiktokCodeOrig }}</p>
          </div>
        </div>
      </span>
      <template slot="needFinish" slot-scope="index, record">
        {{ record.needEffectLiveDay && record.needEffectLiveDay + '天' || '--' }}/{{ record.needLiveDuration && record.needLiveDuration + '小时' || '--' }}/{{ record.needReward && amountFormat(record.needReward) + '元' || '--' }}
      </template>
      <template slot="lectureNameCustom" slot-scope="index, record">
        {{ record.lectureName || '--' }}/{{ record.lecturePercent && amountFormat(record.lecturePercent, true, 3) + '%' || '--' }}
      </template>
      <template slot="signedNameCustom" slot-scope="index, record">
        {{ record.signedName || '--' }}/{{ record.signedPercent && amountFormat(record.signedPercent, true, 3) + '%' || '--' }}
      </template>
      <template slot="recruitNameCustom" slot-scope="index, record">
        {{ record.recruitName || '--' }}/{{ record.recruitPercent && amountFormat(record.recruitPercent, true, 3) + '%' || '--' }}
      </template>
      <template slot="operatorNameCustom" slot-scope="index, record">
        {{ record.operatorName || '--' }}/{{ record.operatorPercent && amountFormat(record.operatorPercent, true, 3) + '%' || '--' }}
      </template>
      <template slot="groupNameCustom" slot-scope="index, record">
        {{ record.departmentManagerName || '--' }}/{{ record.deparmentManagerPercent && amountFormat(record.deparmentManagerPercent, true, 3) + '%' || '--' }}
      </template>
      <template slot="reward" slot-scope="text">
        <span :class="{tips: text > 1330000}">{{ amountFormat(text, true, 1) }}元</span>
      </template>
    </s-table>
  </div>
</template>

<script>
import { STable } from '@/components'
import { columnsNormal, columnsNotStart, columnsCheat, endedColunms, finishedChildColunm } from '../columns'
import { amountFormat } from '@/utils/util'
import { getFinishedInfo } from '@/api/task'
export default {
  name: 'ToalComp',
  props: {
    tabType: {
      type: [Number, String],
      default: null
    },
    params: {
      type: Object,
      default: () => {}
    },
    tableFunc: {
      type: Function,
      default: null
    },
    downUrl: {
      type: String,
      default: null
    },
    isOperate: {
      type: Boolean,
      default: false
    }
  },
  components: {
    STable
  },
  data () {
    return {
      amountFormat,
      finishedChildColunm,
      tableColumns: [],
      sortedInfo: null,
      loading: false,
      expandedRowKeys: []
    }
  },
  mounted () {
    if (this.isOperate) {
      this.finishedChildColunm.filter(item => item.dataIndex !== 'groupNameCustom')
    }
    this.createDownloadUrl(this.params)
  },
  methods: {
    getData (parameter) {
      this.sortedInfo = parameter.sortOrder ? { sortField: parameter.sortField, sortOrder: parameter.sortOrder } : null
      const requestParameters = Object.assign({}, parameter, this.params)
      this.createDownloadUrl(requestParameters)
      return this.tableFunc(requestParameters).then(res => {
        this.expandedRowKeys = []
        this.$forceUpdate()
        return res
      })
    },
    createDownloadUrl (queryParams) {
      let url = ''
      for (const key in queryParams) {
        if (key !== 'page' && key !== 'size') {
          url = url ? `${url}&${key}=${queryParams[key]}` : `?${key}=${queryParams[key]}`
        }
      }
      this.$emit('getDownloadUrl', `${process.env.VUE_APP_API_BASE_URL}${this.downUrl}${url}`)
    },
    expand (expanded, record) {
      if (!expanded) {
        this.expandedRowKeys = this.expandedRowKeys.filter(item => item !== record.tiktokLiveInfoId)
        this.$forceUpdate()
      }
      if (expanded) {
        this.expandedRowKeys.push(record.tiktokLiveInfoId)
        record.loading = true
        getFinishedInfo({
          tiktokLiveInfoId: record.tiktokLiveInfoId
        }).then(res => {
          record.arr = res
          record.loading = false
          this.$forceUpdate()
        })
      }
    }
  },
  computed: {
    columns () {
      const { sortedInfo } = this
      let columns = []

      switch (this.tabType) {
        case 1:
          columns = columnsNormal(sortedInfo).filter(item => item.dataIndex !== 'statisYearMonth' && item.isOperate !== !this.isOperate)
          break
        case 2:
          columns = columnsNotStart
          break
        case 3:
          columns = columnsNormal(sortedInfo).filter(item => item.dataIndex !== 'needFinish' && item.dataIndex !== 'predictComplete' && item.isOperate !== !this.isOperate)
          break
        case 4:
          columns = columnsCheat(sortedInfo)
          break
        case 5:
          columns = endedColunms
          break
        default:
          break
      }
      return columns
    }
  },
  watch: {
    params: {
      handler (val) {
        this.$refs.table.refresh()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  .tips {
    color: #f00;
  }
</style>
