<template>
  <div>
    <a-row>
      <a-col class="lg-24">
        <a-card
          class="card-title-large"
          title="修改记录"
          :bordered="false"
        >
          <div slot="extra">
            <a-button type="primary" icon="download" @click="exportData(false)">导出</a-button>
          </div>
          <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
              <a-row :gutter="60">
                <a-col :md="8" :sm="24">
                  <a-form-item label="主播">
                    <a-input placeholder="主播昵称、抖音号、火山号" v-decorator="['tiktokLiveInfoId']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="修改关系">
                    <a-select
                      allowClear
                      v-decorator="['operationType']"
                      placeholder="请选择"
                    >
                      <a-select-option value="1">
                        招募
                      </a-select-option>
                      <a-select-option value="2">
                        运营
                      </a-select-option>
                      <a-select-option value="3">
                        短视频策划
                      </a-select-option>
                      <a-select-option value="4">
                        策划组长
                      </a-select-option>
                      <a-select-option value="5">
                        短视频拍摄
                      </a-select-option>
                      <a-select-option value="6">
                        短视频后期
                      </a-select-option>
                      <a-select-option value="7">
                        后期组长
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="修改时间">
                    <a-range-picker
                      value-format="YYYY-MM-DD"
                      v-decorator="['signDate']"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <span class="table-page-search-submitButtons" style="margin-bottom:24px">
                    <a-button style="margin-right:16px;" @click="resetFormFileds">重置</a-button>
                    <a-button type="primary" @click="searchHandle">查询</a-button>
                  </span>
                </a-col>
              </a-row>
              <!-- <a-form-item label="主播信息填写时间">
                <a-range-picker
                  value-format="YYYY-MM-DD"
                  v-decorator="['firstEnteringDateOfInfluencerInfo']"
                  style="width:264px"
                />
              </a-form-item>
              <a-form-item label="短视频孵化线填写时间">
                <a-range-picker
                  value-format="YYYY-MM-DD"
                  v-decorator="['firstEnteringDateOfVideoInfo']"
                  style="width:236px"
                />
              </a-form-item> -->
            </a-form>
          </div>
          <s-table
            ref="table"
            style="margin-bottom: 24px"
            row-key="influencerId"
            :columns="relationColumns"
            :data="loadDataHandle"
          >
            <div slot="artists" slot-scope="text, record">
              <div class="flex-box">
                <div class="box-item">
                  <a-popover placement="rightTop">
                    <template slot="content">
                      <div class="box-item-pover">
                        <p class="title">{{ record.nickName }}</p>
                        <p>抖音号: {{ record.tiktokCode }}</p>
                        <p>抖音号(原): {{ record.tiktokCodeOrig }}</p>
                        <p>火山号: {{ record.valcanoCode }}</p>
                      </div>
                    </template>
                    <p class="title">{{ record.nickName }}</p>
                    <p>抖音号: {{ record.tiktokCode }}</p>
                  </a-popover>
                </div>
              </div>
            </div>
          </s-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { getRelationList } from '@/api/gold'
import { relationColumns } from './tableColumns'
import Ellipsis from '@/components/Ellipsis'
// const ArtistPlainOptions = ['直播平台账号昵称', '抖音号', '抖音号（原）', '主播真实姓名', '主播生日', '主播联系电话', '个人微信', '现居城市', '直播方式', '主播类型', '主播评级', '才艺情况', '颜值评估', '互动能力', '初始粉丝量', '最高月流水等级', '备注', '签约情况', '招募姓名', '招募手机号', '入会时间', '直播平台账号ID', '运营人姓名', '运营人分公司']
// const MediaPlainOptions = ['短视频孵化线', '短视频孵化方式', '短视频介入孵化时粉丝量', '短视频策划', '归属团队', '策划组长', '短视频拍摄', '短视频接手时间', '短视频后期', '后期组长']
export default {
  name: 'RelationList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      loading: false,
      relationColumns,
      form: this.$form.createForm(this),
      queryParams: {
      },
      downloadParams: {}
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    loadDataHandle (parameter) {
      this.queryParams.startDate = this.queryParams.signDate ? this.queryParams.signDate[0] : undefined
      this.queryParams.endDate = this.queryParams.signDate ? this.queryParams.signDate[1] : undefined
      const requestParameters = Object.assign({}, parameter, this.queryParams)
      this.downloadParams = requestParameters
      return getRelationList({ ...requestParameters, signDate: undefined }).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.queryParams = {}
      this.$refs.table.refresh(true)
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParams = {
            ...values
          }
          this.$refs.table.refresh(true)
        }
      })
    },
    exportData () {
      let str = ''
      for (var i in this.queryParams) {
        if (this.queryParams[i] && i !== 'signDate') {
          str += `${i}=${this.queryParams[i]}&`
        }
      }
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/afterGoldData/operation/change/log/?${str}`
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
.download{
  float: right;
  margin-bottom: 16px;
}
.mr10{
  margin-right: 26px;
}
.m0{
  margin: 0;
}
</style>
