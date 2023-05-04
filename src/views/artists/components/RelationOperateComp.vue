<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form">
        <a-row :gutter="40">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称">
              <a-input placeholder="请输入抖音昵称" v-decorator="['nickName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item class="form-item-lenth6" label="抖音号/火山号">
              <a-input placeholder="请输入抖音号/火山号" v-decorator="['tiktokCodeOrVolcanoCode']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="入会时间">
              <a-date-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                :disabledDate="disabledDate"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="分公司">
              <a-select v-decorator="['companyId']" placeholder="请选择分公司">
                <a-select-option v-for="(item, index) in companyList" :key="index" :value="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item class="form-item-lenth6" label="运营姓名">
              <a-input placeholder="请输入运营姓名" v-decorator="['operatorEmployeeName']" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="招募姓名">
                <a-input placeholder="请输入招募姓名" v-decorator="['recruitName']" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :class="{'up': advanced}">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" @click="searchHandle">查询</a-button>
              <a @click="toggleAdvanced" style="margin-left: 16px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      row-key="tiktokLiveInfoId"
      :columns="columns"
      :data="getDataHandle"
    >
      <div slot="nickName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <a-popover placement="rightTop">
              <template slot="content">
                <div class="box-item-pover">
                  <p class="title">{{ record.nickName }}</p>
                  <p>抖音号: {{ record.tikTokCode || '-' }}</p>
                  <p>抖音号(原): {{ record.tikTokCodeOrig || '-' }}</p>
                  <p>火山号: {{ record.volcanoCode || '-' }}</p>
                </div>
              </template>
              <p>{{ record.nickName }}</p>
              <p>抖音号: {{ record.tikTokCode || '-' }}</p>
            </a-popover>
          </div>
        </div>
      </div>
      <template slot="operateName" slot-scope="text, record">
        <div class="crip" v-if="!record.editO && !record.allEdit">
          <span>{{ text || '-' }} </span>
          <a-icon type="edit" style="cursor:pointer;" @click="editHandle(record.tiktokLiveInfoId, 'O')" />
        </div>
        <div class="edit-con" v-if="record.editO || record.allEdit">
          <search-select
            class="flex1"
            :value="record.operateObj"
            :tags="relationOperateTags"
            v-model="record.operateObj"
            :searchFn="artistOperateSearch"
          />
          <div class="btn-group" v-if="!record.allEdit">
            <a-button type="primary" style="margin-right:10px;" class="cancel" @click="editHandle(record.tiktokLiveInfoId, 'O')">取消</a-button>
            <a-button type="primary" @click="submitSingleHandle(record.tiktokLiveInfoId, 'O')">提交</a-button>
          </div>
        </div>
      </template>
      <template slot="recruitName" slot-scope="text, record">
        <div class="crip" v-if="!record.editR && !record.allEdit">
          <span>{{ text || '-' }} </span>
          <a-icon type="edit" style="cursor:pointer;" @click="editHandle(record.tiktokLiveInfoId, 'R')" />
        </div>
        <div class="edit-con" v-if="record.editR || record.allEdit">
          <search-input
            class="flex1"
            :tags="relationRecruitTags"
            :value="record.recruitVal"
            v-model="record.recruitVal"
          />
          <div class="btn-group" v-if="!record.allEdit">
            <a-button type="primary" style="margin-right:10px;" class="cancel" @click="editHandle(record.tiktokLiveInfoId, 'R')">取消</a-button>
            <a-button type="primary" @click="submitSingleHandle(record.tiktokLiveInfoId, 'R')">提交</a-button>
          </div>
        </div>
      </template>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click.stop="historyHandle(record.tiktokLiveInfoId)">历史记录</a-button>
      </span>
    </s-table>
    <relation-history-dialog :id="artistId" :visible="visible" @cancel="cancelHandle" />
  </div>
</template>

<script>
import storage from 'store'
import moment from 'moment'
import { STable } from '@/components'
import SearchSelect from './SearchSelect'
import SearchInput from './SearchInput'
import RelationHistoryDialog from '../modules/RelationHistoryDialog'
import { getOperateRelationList, artistOperateSearch, operateMutipleModify, getCompany } from '@/api/artists'

const columns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '小组',
    dataIndex: 'operateDepartName'
  },
  {
    title: '运营',
    dataIndex: 'operateName',
    scopedSlots: { customRender: 'operateName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName',
    scopedSlots: { customRender: 'recruitName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'RelationOperateComp',
  components: {
    STable,
    SearchSelect,
    SearchInput,
    RelationHistoryDialog
  },
  props: {
    mutiple: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      advanced: false,
      form: this.$form.createForm(this),
      columns,
      visible: false,
      queryParam: {},
      artistId: '',
      artistOperateSearch,
      relationOperateTags: [],
      relationRecruitTags: [],
      companyList: []
    }
  },
  mounted () {
    this.getCompanyHandle()
    const oTags = storage.get('relation-operate-tags')
    const rTags = storage.get('relation-recruit-tags')
    this.relationOperateTags = oTags || []
    this.relationRecruitTags = rTags || []
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    getCompanyHandle () {
      getCompany().then(res => {
        this.companyList = res
      })
    },
    getDataHandle (parameter) {
      this.$emit('success')
      const params = Object.assign({}, parameter, this.queryParam)
      return getOperateRelationList(params).then(res => {
        res.list = this.createData(res.list)
        return res
      })
    },
    createData (data) {
      data.forEach(item => {
        item.operateObj = item.operatorEmployeeId ? [{ label: item.operateName, key: String(item.operatorEmployeeId) }] : []
        item.recruitVal = item.recruitName
        item.editO = false
        item.editR = false
        item.allEdit = false
      })

      return data
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('success')
          this.queryParam = {
            ...values
          }

          this.$refs.table.refresh(true)
        }
      })
    },
    resetFormFileds () {
      this.$emit('success')
      this.form.resetFields()
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    },

    historyHandle (id) {
      this.artistId = id
      this.visible = true
    },

    cancelHandle () {
      this.visible = false
    },

    editHandle (id, type) {
      const data = this.$refs.table.localDataSource.filter(item => item.tiktokLiveInfoId === id)[0]
      // 取消时 重置初始值
      if (type === 'O') {
        data.editO = !data.editO
        data.operateObj = data.operatorEmployeeId ? [{ label: data.operateName, key: String(data.operatorEmployeeId) }] : []
      } else {
        data.editR = !data.editR
        data.recruitVal = data.recruitName
      }
      this.$refs.table.localDataSource.forEach(item => {
        if (item.tiktokLiveInfoId === id) {
          item = data
        }
      })
    },
    setData (val) {
      this.$refs.table.localDataSource.forEach(item => {
        // 重置初始值
        item.operateObj = item.operatorEmployeeId ? [{ label: item.operateName, key: String(item.operatorEmployeeId) }] : []
        item.recruitVal = item.recruitName
        item.editO = false
        item.editR = false
        item.allEdit = val
      })
    },
    submitSingleHandle (id, type) {
      const data = this.$refs.table.localDataSource.filter(item => item.tiktokLiveInfoId === id)[0]
      if (type === 'O') {
        this.setOperateHandle(id, data)
      } else {
        this.setRecruitHandle(id, data)
      }
    },
    setOperateHandle (id, data) {
      if (data.operateObj.length <= 0) {
        this.$message.error('请选择运营人')
        return
      }
      const param = [{
        tiktokLiveInfoId: id,
        recruitName: data.recruitName,
        employeeIdOrDepartmentId: data.operateObj[0].key
      }]
      this.setTags(data.operateObj, [])
      this.operateModifyHandle(param)
    },
    setRecruitHandle (id, data) {
      if (!data.recruitVal || data.recruitVal.trim() === '') {
       this.$message.error('请填写招募人')
        return
      }
      const param = [{
        tiktokLiveInfoId: id,
        recruitName: data.recruitVal,
        employeeIdOrDepartmentId: data.operatorEmployeeId
      }]
      this.setTags([], [data.recruitVal])
      this.operateModifyHandle(param)
    },
    operateModifyHandle (data) {
      if (data && data.length <= 0) {
        this.$message.error('提交数据不能为空')
        return
      }
      operateMutipleModify({
        pairLists: data
      }).then(() => {
        this.$message.success('操作成功')
        this.$emit('success')
        this.$refs.table.refresh()
      })
    },
    submitHandle () {
      const arr = []
      const operateTags = []
      const recruitTags = []
      this.$refs.table.localDataSource.forEach(item => {
        arr.push({
          tiktokLiveInfoId: item.tiktokLiveInfoId,
          recruitName: item.recruitVal ? item.recruitVal : item.recruitName,
          employeeIdOrDepartmentId: item.operateObj.length > 0 ? parseInt(item.operateObj[0].key) : parseInt(item.operatorEmployeeId)
        })
        if (item.operateObj.length > 0) {
          operateTags.push(...item.operateObj)
        }
        if (item.recruitVal && item.recruitVal.trim() !== '') {
          recruitTags.push(item.recruitVal)
        }
      })
      this.setTags(operateTags, recruitTags)
      this.operateModifyHandle(arr)
    },

    // 设置常用标签
    setTags (operateTags, recruitTags) {
      // 设置运营tags
      let optTags = [
        ...operateTags,
        ...this.relationOperateTags
      ]
      optTags = this.dealRepeatArray(optTags)
      if (optTags.length > 3) {
        optTags = optTags.slice(0, 3)
      }
      this.relationOperateTags = optTags
      storage.set('relation-operate-tags', optTags)

      // 设置招募tags
      let cruTags = [
        ...recruitTags,
        ...this.relationRecruitTags
      ]
      cruTags = this.uniqArray(cruTags)
      if (cruTags.length > 3) {
        cruTags = cruTags.slice(0, 3)
      }
      this.relationRecruitTags = cruTags
      storage.set('relation-recruit-tags', cruTags)
    },
    dealRepeatArray (arr) {
      const map = new Map()
      for (const item of arr) {
        if (!map.has(item.key)) {
          map.set(item.key, item)
        }
      }
      return [...map.values()]
    },
    uniqArray (arr) {
      var temp = [] // 一个新的临时数组
      for (var i = 0; i < arr.length; i++) {
        if (!temp.includes(arr[i])) {
          temp.push(arr[i])
        }
      }
      return temp
    }
  },
  watch: {
    mutiple (val) {
      this.setData(val)
    },
    submit (val) {
      if (val) {
        this.submitHandle()
      }
    }
  }
}
</script>
