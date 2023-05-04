<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      :bordered="false"
    >
      <div slot="title">
        主播基础评分
        <div class="select-custom">
          保底平台：{{ platformList.length !== 0 ? platformList.find(item => item.id === queryParams.platformType).name : '' }}
          <a-icon type="caret-down" />
          <!-- <span class="label">分公司:</span> -->
          <a-select v-model="queryParams.platformType" class="company-select" style="min-width: 150px;" @change="onSearch">
            <a-select-option v-for="(item, index) in platformList" :key="index" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div slot="extra" style="display:flex">
        <a-button class="btn" type="primary" icon="plus-circle" @click="showModal">添加</a-button>
        <a-input-search v-model="queryParams.nickname" placeholder="请输入主播昵称" style="width: 200px;margin-left:24px" @search="onSearch" />
      </div>
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getData"
        showPagination="auto"
      >
        <div slot="nickName" slot-scope="text, record">
          <div class="flex-box">
            <div class="box-item">
              <p>{{ record.nickName }} <span class="score-label">{{ record.actorCategory.code | changeCategory }}</span></p>
              <p>平台ID: {{ record.platformAccount || '-' }}</p>
            </div>
          </div>
        </div>
        <template slot="action" slot-scope="text, record">
          <a-button
            type="link"
            class="action-btn"
            v-if="record.state.code === 0"
            @click="grade(record)">评分</a-button>
          <a-button
            type="link"
            class="action-btn"
            v-if="record.appealable && record.state.code === 3"
            @click="grade(record)"
          >申诉</a-button>
        </template>
      </s-table>
    </a-card>
    <a-modal
      title="新增主播"
      :width="550"
      :visible="visible"
      :maskClosable="false"
      @cancel="handleCancel"
    >
      <a-form :form="form" :label-col="{ span: 9 }" :wrapper-col="{ span: 11 }">
        <a-form-item label="保底平台">
          <a-radio-group
            v-decorator="[ 'platformType', { rules: [{ required: true, message: '请选择保底平台!' }], initialValue: 1 }]"
            @change="handleRadioChange"
          >
            <a-radio :value="1">
              抖音
            </a-radio>
            <a-radio :value="2">
              视频号
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="主播类型">
          <a-select
            v-decorator="[
              'actorCategory',
              { rules: [{ required: true, message: '请选择主播类型!' }] },
            ]"
            placeholder="请选择主播类型"
            @change="handleTypeChange"
          >
            <a-select-option :value="li.id" v-for="li in influencerTypeList" :key="li.id">
              {{ li.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="主播真实姓名">
          <a-input
            v-decorator="['reallyName', { rules: [{ required: true, message: '请输入真实姓名!' }] }]"
            placeholder="请输入真实姓名"
          />
        </a-form-item>
        <template v-if="form.getFieldValue('actorCategory') !== 0 || (form.getFieldValue('platformType') === 2 && form.getFieldValue('actorCategory') === 0)">
          <a-form-item label="主播昵称">
            <a-input
              v-decorator="['nickName', { rules: [{ required: true, message: '请输入主播昵称!' }] }]"
              placeholder="请输入主播昵称"
            />
          </a-form-item>
        </template>
        <template v-if="form.getFieldValue('actorCategory') !== 0">
          <a-form-item label="主播ID">
            <a-input
              v-decorator="['platformAccount', { rules: [{ required: false }] }]"
              placeholder="请输入主播ID"
            />
          </a-form-item>
          <a-form-item label="直播平台" v-if="form.getFieldValue('actorCategory') === 2">
            <a-select
              v-decorator="['scorePlatform', { rules: [{ required: true, message: '请选择平台类型!' }] },]"
              placeholder="请选择平台类型"
              @change="handlePlatformChange"
            >
              <a-select-option :value="li.id" v-for="li in platform" :key="li.id">
                {{ li.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="其他平台名称" v-show="actorCategory">
            <a-input
              v-decorator="['otherPlatform', { rules: [{ required: actorCategory, message: '请输入其他平台名称' }] }]"
              placeholder="请输入其他平台名称"
              :maxLength="20"
            />
          </a-form-item>
          <a-form-item label="是否最近三个月榜超20万" v-show="scorePlatform">
            <a-radio-group v-decorator="['isRecent2MonthOver20', { rules: [{ required: scorePlatform, message: '请选择是否最近三个月榜超20万' }] }]">
              <a-radio :value="true">
                是
              </a-radio>
              <a-radio :value="false">
                否
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </template>
        <template v-if="form.getFieldValue('platformType') === 2 && form.getFieldValue('actorCategory') === 0">
          <!-- 视频号类型 存量主播显示字段 -->
          <a-form-item label="视频号id">
            <a-input
              v-decorator="['platformAccount', { rules: [{ required: true, message: '请输入视频号id' }] }]"
              maxLenth="30"
              placeholder="请输入视频号id"
            />
          </a-form-item>
          <a-form-item label="断播月数">
            <a-input-number
              style="width:100%"
              v-decorator="['breakLiveDay', { rules: [{ required: true, message: '请输入断播月数' }], initialValue: 0 }]"
              :min="0"
              :max="12"
              placeholder="请输入断播月数"
            />
          </a-form-item>
        </template>
        <template v-if="form.getFieldValue('actorCategory') === 0 && form.getFieldValue('platformType') === 1">
          <!-- 抖音类型 存量主播显示字段 -->
          <a-form-item
            label="主播">
            <a-select
              placeholder="请输入主播昵称或id"
              v-decorator="['name', { rules: [{ required: true, message: '主播不能为空' }]}]"
              show-search
              label-in-value
              style="width: 100%"
              :filter-option="false"
              :not-found-content="fetching ? undefined : null"
              @search="fetchUser"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="d in artistData" :key="d.value">
                {{ d.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </template>
        <div class="tip-cont">
          注：每个主播被驳回仅可申诉一次，不可换号或者更改id。多次提交申请，一经发现，取消该小组保底资格一个月。
        </div>
      </a-form>
      <template slot="footer">
        <a-button key="cancel" @click="handleCancel">取 消</a-button>
        <a-button key="create" type="primary" @click="handleSubmit" :loading="loading">确 定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { STable } from '@/components'
import { platform, influencerType } from '../type'
import { baseColumns } from '../tableColumns'
import { getBaseScoreList, addBaseInfluencer } from '@/api/score'
import { anchorScoreSearch } from '@/api/artists'
export default {
  components: {
    STable
  },
  data () {
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
    return {
      columns: baseColumns,
      visible: false,
      queryParams: {
        nickname: '',
        platformType: ''
      },
      form: this.$form.createForm(this),
      fetching: false,
      artistData: [],
      platform,
      influencerTypeList: [],
      actorCategory: false,
      scorePlatform: false,
      loading: false,

      platformList: [
        { id: '', name: '全部' },
        { id: 1, name: '抖音' },
        { id: 2, name: '视频号' }
      ]
    }
  },
  mounted () {
    this.influencerTypeList = influencerType.filter(item => item.id !== 3)
  },
  methods: {
    fetchUser (value) {
      if (value.trim() === '') return
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.artistData = []
      this.fetching = true
      anchorScoreSearch(value).then(res => {
        if (fetchId !== this.lastFetchId) {
            // for fetch callback order
          return
        }
        const data = res.map(item => ({
          text: `${item.nickName}`,
          value: item.tiktokLiveInfoId,
          tikTokCode: item.tikTokCode
        }))
        this.artistData = data
        this.fetching = false
      })
    },
    onSearch () {
      this.$refs.table.refresh(true)
    },
    getData (parameter) {
      const params = Object.assign({}, parameter, this.queryParams)
      return getBaseScoreList(params).then(res => {
        return res
      })
    },
    showModal () {
      this.visible = true
    },
    handleRadioChange (e) {
      if (e.target.value === 1) {
        this.influencerTypeList = influencerType.filter(item => item.id !== 3)
      } else {
        this.influencerTypeList = influencerType
      }
      this.form.resetFields()
      this.handleTypeChange('')
    },
    handlePlatformChange (val) {
      if (val === 0) {
        this.actorCategory = true
      } else {
        this.actorCategory = false
      }
      this.$nextTick(() => {
        this.form.setFieldsValue({
          otherPlatform: undefined
        })
        this.form.validateFields(['otherPlatform'], { force: true })
      })
    },
    handleTypeChange (val) {
      if (val === 2) {
        this.scorePlatform = true
      } else {
        this.scorePlatform = false
      }
      this.$nextTick(() => {
        this.form.setFieldsValue({
          'isRecent2MonthOver20': undefined
        })
        this.form.validateFields(['isRecent2MonthOver20'], { force: true })
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      if (this.loading) return
      this.form.validateFields((err, values) => {
         if (!err) {
          this.loading = true
          let data = {}
          if (values.actorCategory === 0 && values.platformType !== 2) {
            const actor = this.artistData.filter(item => values.name.key === item.value)[0]
            data = {
              ...values,
              nickName: actor.text,
              tiktokLiveInfoId: actor.value,
              platformAccount: actor.tikTokCode,
              name: undefined
            }
          } else {
            data = {
              ...values
            }
          }
          addBaseInfluencer(data).then(res => {
            this.loading = false
            this.$message.success('操作成功')
            this.visible = false
            this.$refs.table.refresh()
          }).catch(res => {
            this.loading = false
          })
         }
       })
    },
    grade (data) {
      if (data.state.code === 1 || (data.state.code === 2 && !data.appealable)) {
        return
      }
      this.$router.push({
        path: '/score/base/grade',
        query: {
          scoreId: data.id
        }
      })
    }
  },
  filters: {
    changeSate (val) {
      if (val === 0) {
        return '-'
      } else if (val === 1) {
        return '通过-待评委打分'
      } else if (val === 2) {
        return '未通过'
      }
    },
    changeCategory (val) {
      if (val === 0) {
        return '存量'
      } else if (val === 1) {
        return '新'
      } else if (val === 2) {
        return '优质'
      } else if (val === 3) {
        return '游戏'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
.opt-con .btn {
  margin: 0 10px;
}
.action-btn{
  &.disabled{
    cursor: not-allowed;
    color: #CFCED6!important;
  }
}
</style>
