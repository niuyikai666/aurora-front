<template>
  <div>
    <!-- <a-result
      v-if="!hasAuth"
      status="404"
      title="405"
      sub-title="抱歉！您未给该页面分配权限"
      style="margin-top: 50px"
    ></a-result> -->
    <div>
      <a-card
        :bordered="false"
      >
        <div class="opt-con">
          <span class="flex1">
            <a-form layout="inline">
              <a-row :gutter="60">
                <a-col :md="24" :sm="24" style="display:flex;align-items: center;">
                  <a-form-item label="主播昵称/ID" class="form-item-lenth7">
                    <a-input placeholder="请输入" v-model="queryParams.keyword" />
                  </a-form-item>
                  <a-form-item label="筛选" class="form-item-lenth7">
                    <a-select placeholder="请选择" v-model="queryParams.searchType" :allowClear="true" style="width: 200px">
                      <a-select-option value="0">本月九宫格有流水</a-select-option>
                      <a-select-option value="1">不看0分成比主播</a-select-option>
                    </a-select>
                  </a-form-item>
                  <span>
                    <a-button @click="resetFormFileds">重置</a-button>
                    <a-button
                      style="margin-left: 12px"
                      type="primary"
                      @click="searchHandle"
                    >
                      查询
                    </a-button>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </span>
          <div slot="extra-btn">
            <div style="text-align:right; flex: 1">
              <a-button-group class="btn-group btn-group-extra">
                <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
                <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
                <a-month-picker v-model="timeRange[2].value" :disabled-date="disabledDate" value-format="YYYY-MM" @change="changeTime()"><a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-month-picker>
              </a-button-group>
            </div>
          </div>
        </div>
        <s-table
          class="mt24"
          ref="table"
          row-key="tiktokLiveInfoId"
          :columns="columns"
          :data="getData"
          :scroll="{x: 1200}"
        >
          <span slot="nickName" slot-scope="text, record">
            <div class="flex-box">
              <div class="box-item">
                <p>{{ record.nickName }}</p>
                <p>抖音号: {{ record.tiktokCode }}</p>
                <p>火山号: {{ record.volcanoCode }}</p>
              </div>
            </div>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="handleCreate(record)">提报比例</a-button>
          </span>
        </s-table>
        <modify-dialog
          :visible="visible"
          :model="model"
          @cancel="handleCancel"
          @success="handleSuccess"
        />
      </a-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { columns } from './columns'
import { getSquaredProportionList } from '@/api/task'
import { STable } from '@/components'
import ModifyDialog from './components/ModifyDialog'

export default {
  name: 'Squared',
  components: {
    STable,
    ModifyDialog
  },
  data() {
    return {
      hasAuth: true,
      loading: false,
      columns,
      queryParams: {
        keyword: '',
        searchType: undefined,
        monthCycle: moment().format('YYYY-MM')
      },
      activeTimeIndex: 0,
      timeRange: [
        {
          text: '本月',
          value: moment().format('YYYY-MM')
        },
        {
          text: '上月',
          value: moment(new Date()).subtract(1, 'months').format('YYYY-MM')
        },
        {
          text: '自定义',
          value: undefined
        }
      ],
      visible: false,
      model: null
    }
  },
  created () {
    if (!this.permission.includes('video_palace_operator_submit_ratio_submit')) {
      this.columns = this.columns.filter(item => item.dataIndex !== 'action')
    }
  },
  mounted() {
    this.loading = true
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, this.queryParams || {}, parameter)
      return getSquaredProportionList(requestParameters).then(res => {
        // this.loading = false
        return res
      })
    },
    handleCreate (data) {
      this.model = data
      this.visible = true
    },
    change (index) {
      this.setParams(index, this.timeRange[index].value)
    },
    changeTime () {
      this.setParams(2, this.timeRange[2].value)
    },
    setParams (index, time) {
      this.activeTimeIndex = index
      this.queryParams.monthCycle = time
      this.$refs.table.refresh(true)
    },
    searchHandle () {
      this.$refs.table.refresh(true)
    },
    resetFormFileds () {
      this.queryParams.keyword = ''
      this.queryParams.searchType = undefined
      this.$refs.table.refresh(true)
    },
    handleCancel () {
      this.model = null
      this.visible = false
    },
    handleSuccess () {
      this.visible = false
      this.$refs.table.refresh(true)
    },
    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
  .opt-con {
    display: flex;
    .flex1 {
      flex: 1;
    }
  }
</style>
