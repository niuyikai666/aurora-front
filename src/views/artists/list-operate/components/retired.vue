<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="抖音账号">
              <a-input placeholder="请输入" v-decorator="['trillNumber']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="入会时间">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称">
              <a-input placeholder="请输入" v-decorator="['nickName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="招募">
              <a-input placeholder="请输入" v-decorator="['recruitName']" />
            </a-form-item>
          </a-col>
          <!-- <a-col :md="8" :sm="24">
            <a-form-item label="运营">
              <a-input placeholder="请输入" v-decorator="['operatorName']" />
            </a-form-item>
          </a-col> -->
          <a-col :md="8" :sm="24">
            <a-form-item class="form-item-lenth5" label="短视频孵化">
              <a-input placeholder="请输入" v-decorator="['engineerName']" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="所属品类">
                <a-select
                  v-decorator="['actorCategory']"
                  placeholder="请选择"
                  @change="searchHandle"
                >
                  <a-select-option :value="1">
                    颜值
                  </a-select-option>
                  <a-select-option :value="2">
                    人气
                  </a-select-option>
                  <a-select-option :value="3">
                    才艺
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="才艺类型">
                <a-select
                  v-decorator="['talentCategory']"
                  placeholder="请选择"
                  @change="searchHandle"
                >
                  <a-select-option :value="1">
                    舞蹈
                  </a-select-option>
                  <a-select-option :value="2">
                    唱歌
                  </a-select-option>
                  <a-select-option :value="3">
                    乐器
                  </a-select-option>
                  <a-select-option :value="4">
                    脱口秀
                  </a-select-option>
                  <a-select-option :value="5">
                    其他
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 16" :sm="24">
            <span class="table-page-search-submitButtons" :class="{'up': advanced}">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
              <a @click="toggleAdvanced" style="margin-left: 16px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="clearfix">
      <a-popover placement="right" :trigger="['click']">
        <template slot="content">
          <div class="pop-wraper">
            <a-checkbox-group v-model="colunmsChecked" @change="checkedChange">
              <a-row>
                <a-col :span="8" v-for="li in checkArr" :key="li.dataIndex">
                  <a-checkbox :value="li.dataIndex" style="margin-bottom:10px">
                    {{ li.title }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
        </template>
        <div class="fr more-action">
          <a-icon type="setting" class="pointer"/>
          更多指标
        </div>
      </a-popover>
    </div>
    <s-table
      :columns="tableColums"
      row-key="id"
      :data="loadData"
      ref="table"
      :scroll="{x: 1200}"
    >
      <div slot="nickName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <a-popover placement="rightTop">
              <template slot="content">
                <div class="box-item-pover">
                  <p class="title">{{ record.nickName }}</p>
                  <p>抖音号: {{ record.tikTokCode }}</p>
                  <p>抖音号(原): {{ record.tikTokCodeOrig }}</p>
                  <p>火山号: {{ record.volcanoCode }}</p>
                </div>
              </template>
              <p>{{ record.nickName }}</p>
              <p>抖音号: {{ record.tikTokCode }}</p>
            </a-popover>
          </div>
        </div>
      </div>
      <template slot="currentMonthTotalReward" slot-scope="text, record">
        {{ record.currentMonthTotalReward !== null ? numberFormat(record.currentMonthTotalReward) : '-' }} {{ record.currentMonthTotalReward > 10000 ? '万' : '' }}
      </template>
      <template slot="totalFans" slot-scope="text, record">
        {{ numberFormat(record.totalFans) }} {{ record.totalFans > 10000 ? '万' : '' }}
      </template>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record.id)" style="margin-right:10px">详情</a-button>
      </span>
    </s-table>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { retiredColumns } from '../tableColumns'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    },
    dataType: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    STable
  },
  data () {
    return {
      numberFormat,
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: false,
      tableColums: [],
      colunmsChecked: [],
      checkArr: [],
      defaultColunm: ['nickName', 'totalFans', 'joinGuildDate', 'retiredDate', 'action']
    }
  },
  created () {
    if (!(this.permission.includes('actor_operation_live') || this.permission.includes('actor_operation_video'))) {
      this.defaultColunm = this.defaultColunm.filter(item => item !== 'action')
    }
    this.getTableColumns()
  },
  mounted () {},

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams, { dataType: this.dataType, type: this.type })
      return this.fn(params).then(res => {
        return res
      })
    },
    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    getTableColumns () {
      const storageColumns = localStorage.getItem(`my-artists-${this.type}`) ? JSON.parse(localStorage.getItem(`my-artists-${this.type}`)) : []
      this.tableColums = retiredColumns.filter(item => storageColumns.includes(item.dataIndex) || this.defaultColunm.includes(item.dataIndex))
      this.colunmsChecked = storageColumns
      this.checkArr = retiredColumns.filter(item => !this.defaultColunm.includes(item.dataIndex) && item.dataIndex !== 'action')
    },
    checkedChange () {
      this.tableColums = retiredColumns.filter(item => this.colunmsChecked.includes(item.dataIndex) || this.defaultColunm.includes(item.dataIndex))
      localStorage.setItem(`my-artists-${this.type}`, JSON.stringify(this.colunmsChecked))
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values,
              joinGuideDateStart: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              joinGuideDateEnd: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            resolve(queryParams)
          }
        })
      })
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values,
              joinGuideDateStart: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              joinGuideDateEnd: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    detailHandle (id) {
      this.$router.push({
        path: '/artists/detail',
        query: {
          id: id
        }
      })
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}

</script>
<style lang='less' scoped>
@import '../../index.less';
</style>
