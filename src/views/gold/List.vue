<template>
  <div>
    <a-row>
      <a-col class="lg-24">
        <a-card
          class="card-title-large"
          title="主播信息补全"
          :bordered="false"
        >
          <div class="table-page-search-wrapper" style="margin-bottom:16px">
            <a-form layout="inline" :form="form" @submit="searchHandle">
              <a-row :gutter="60">
                <a-col :md="8" :sm="24">
                  <a-form-item class="form-item-lenth6" label="抖音号/抖音号原">
                    <a-input placeholder="请输入抖音号/抖音号原" v-decorator="['trillNumber']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="火山号">
                    <a-input placeholder="请输入火山号" v-decorator="['volcanoCode']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="入会时间" class="form-item-lenth6">
                    <a-range-picker
                      value-format="YYYY-MM-DD"
                      v-decorator="['signDate']"
                      @change="searchHandle"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item class="form-item-lenth6" label="招募姓名">
                    <a-input placeholder="请输入招募姓名" v-decorator="['recruitName']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="运营姓名">
                    <a-input placeholder="请输入" v-decorator="['operateName']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item class="form-item-lenth6" label="短视频孵化线">
                    <a-select
                      v-decorator="['operationType', { initialValue: '0' }]"
                      placeholder="请选择"
                      @change="searchHandle"
                    >
                      <a-select-option value="0">
                        全部
                      </a-select-option>
                      <a-select-option value="1">
                        DK
                      </a-select-option>
                      <a-select-option value="2">
                        建宁
                      </a-select-option>
                      <a-select-option value="3">
                        其他
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="信息进度" class="item-info form-item-lenth6" style="margin-bottom:0">
                    <a-select
                      v-decorator="['infoState', { initialValue: '0' }]"
                      placeholder="请选择"
                      @change="searchHandle"
                    >
                      <a-select-option value="0">
                        全部
                      </a-select-option>
                      <a-select-option value="1">
                        30%
                      </a-select-option>
                      <a-select-option value="2">
                        70%
                      </a-select-option>
                      <a-select-option value="3">
                        100%
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="签约状态" class="item-info" style="margin-bottom:0">
                    <a-select
                      v-decorator="['signMethod', { initialValue: '0' }]"
                      placeholder="请选择"
                      @change="searchHandle"
                    >
                      <a-select-option value="0">
                        全部
                      </a-select-option>
                      <a-select-option value="1">
                        全约
                      </a-select-option>
                      <a-select-option value="2">
                        网签
                      </a-select-option>
                      <a-select-option value="3">
                        未签约
                      </a-select-option>
                      <a-select-option value="4">
                        签约到期
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button style="margin-right:16px;" @click="resetFormFileds">重置</a-button>
                    <a-button type="primary" html-type="submit">查询</a-button>
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
          <div class="flex-justify" style="margin-bottom:16px">
            <div>
              <a-button type="primary" class="margin-btn" @click="importRelationHandle" v-if="permission.includes('goldData_update_batch')">批量导入关系</a-button>
              <a-button type="primary" class="margin-btn" @click="relationEdit" v-if="permission.includes('batchUpdate_operation')">修改关系</a-button>
              <a-button type="primary" class="margin-btn" @click="toRelation" v-if="permission.includes('operation_change_log_list')">修改记录</a-button>
            </div>
            <div>
              <a-button type="primary" class="margin-btn" @click="download" v-if="permission.includes('actor_relation')">导出主播关系</a-button>
              <a-button type="primary" class="margin-btn" @click="importHandle" v-if="permission.includes('import_sign_relation')">导入签约人</a-button>
              <a-button v-if="permission.includes('goldData_opt_export')" type="primary" @click="showModal(false)">
                <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
                导出
              </a-button>
            </div>
          </div>
          <s-table
            ref="table"
            style="margin-bottom: 24px"
            row-key="influencerId"
            :columns="columns"
            :data="loadDataHandle"
            :scroll="{x:1800}"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
            <div slot="artists" slot-scope="text, record">
              <div class="flex-box">
                <div class="box-item">
                  <a-popover placement="rightTop">
                    <template slot="content">
                      <div class="box-item-pover">
                        <p class="title">{{ record.nickname }}</p>
                        <p>抖音号: {{ record.newTrillNumber }}</p>
                        <p>抖音号(原): {{ record.oldTrillNumber }}</p>
                        <p>火山号: {{ record.newVolcanoNumber }}</p>
                      </div>
                    </template>
                    <p class="title">{{ record.nickname }}</p>
                    <p>抖音号: {{ record.newTrillNumber }}</p>
                  </a-popover>
                </div>
              </div>
            </div>
            <div slot="signingTime" slot-scope="text, record">
              {{ record.signingTime ? record.signingTime : '-' }}
            </div>
            <div slot="firstEnteringDateOfInfluencerInfo" slot-scope="text, record">
              {{ record.firstEnteringDateOfInfluencerInfo ? record.firstEnteringDateOfInfluencerInfo : '-' }}
            </div>
            <div slot="firstEnteringDateOfVideoInfo" slot-scope="text, record">
              {{ record.firstEnteringDateOfVideoInfo ? record.firstEnteringDateOfVideoInfo : '-' }}
            </div>
            <div slot="operatorName" slot-scope="text, record">
              {{ record.operatorName ? record.operatorName : '-' }}
            </div>
            <div slot="signMethod" slot-scope="text, record">
              <p style="margin:0">{{ record.signMethod ? record.signMethod.msg : '' }}</p>
              <p style="margin:0">{{ record.signEmpName }}{{ record.signDepartmentName ? `(${record.signDepartmentName})`: '' }}</p>
            </div>
            <div slot="signStartDate" slot-scope="text, record">
              <span v-if="!record.signStartDate && ! record.signEndDate">-</span>
              <span v-else>{{ record.signStartDate ? record.signStartDate : '-' }} 至 {{ record.signEndDate ? record.signEndDate : '-' }}</span>
            </div>
            <div slot="operationType" slot-scope="text, record">
              {{ record.operationType ? record.operationType : '-' }}
            </div>
            <span slot="action" slot-scope="text, record">
              <a-popover placement="bottom">
                <template slot="content">
                  <div class="btn-drop-group">
                    <a-button type="link" @click="detailHandle(record.influencerId, 1)" v-if="permission.includes('goldData_operation_show')">运营关系查看</a-button>
                    <a-button type="link" @click="detailHandle(record.influencerId, 2)" v-if="permission.includes('goldData_video_show')">短视频关系查看</a-button>
                  </div>
                </template>
                <a-button type="link" v-if="(permission.includes('goldData_operation_show') || permission.includes('goldData_video_show'))">关系查看</a-button>
              </a-popover>
              <a-button type="link" @click="showModal(record.influencerId)" class="ml10" v-if="permission.includes('goldData_opt_export')">下载</a-button>
              <!-- <a-button type="link" @click="detailHandle(record.influencerId)" class="mr10">详情</a-button>
              <a-button type="link" @click="eidtHandle(record.influencerId)" class="mr10" v-if="permission.includes('goldData_opt_edit')">修改</a-button>
               -->
            </span>
          </s-table>
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model="visible" title="导出字段" @ok="handleOk" :width="620">
      <tab-content title="主播信息" :titleLine="true" style="margin-bottom:22px">
        <div class="box">
          <a-checkbox :checked="ArtistCheckAll" @change="onArtistCheckAllChange" class="checkAll" style="font-size: 16px; font-weight:bold;">
            全选
          </a-checkbox>
        </div>
        <a-checkbox-group v-model="ArtistCheckedList" :options="ArtistPlainOptions" @change="onArtistChange" >
        </a-checkbox-group >
      </tab-content>
      <tab-content title="短视频信息" :titleLine="true">
        <div class="box">
          <a-checkbox :checked="MediaCheckAll" @change="onMediaCheckAllChange" class="checkAll" style="font-size: 16px; font-weight:bold;">
            全选
          </a-checkbox>
        </div>
        <a-checkbox-group v-model="MediaCheckedList" :options="MediaPlainOptions" @change="onMediaChange"/>
      </tab-content>
    </a-modal>
    <a-drawer
      class="drawer-form-wraper"
      title="修改关系"
      placement="right"
      :visible="relationVisible"
      @close="onClose"
      width="348"
    >
      <a-form layout="vertical">
        <a-form-item label="招募" v-if="permission.includes('goldData_operation_edit')">
          <employee-search
            placeholder="请选择招募"
            :searchFn="artistSearch"
            v-model="relationForm.recruitEmployeeId"
          />
        </a-form-item>
        <a-form-item label="运营" v-if="permission.includes('goldData_operation_edit')">
          <employee-search
            placeholder="请选择运营"
            :searchFn="artistSearch"
            dutyType="1"
            v-model="relationForm.operatorEmployeeId"
          />
        </a-form-item>
        <a-form-item label="讲师" v-if="permission.includes('goldData_operation_edit')">
          <employee-search
            placeholder="请选择讲师"
            :searchFn="artistSearch"
            v-model="relationForm.lecturerRecruitEmployeeId"
          />
        </a-form-item>
        <a-form-item label="签约人" v-if="permission.includes('goldData_operation_edit')">
          <employee-search
            placeholder="请选择签约人"
            :searchFn="artistSearch"
            v-model="relationForm.signedEmployeeId"
          />
        </a-form-item>
        <a-form-item label="短视频策划" v-if="permission.includes('goldData_video_edit')">
          <employee-search
            placeholder="请选择短视频策划"
            :searchFn="artistSearch"
            dutyType="2"
            v-model="relationForm.engineerEmployeeId"
          />
        </a-form-item>
        <!-- <a-form-item label="策划组长" v-if="permission.includes('goldData_video_edit')">
          <employee-search
            placeholder="请选择策划组长"
            :searchFn="artistSearch"
            dutyType="2"
            v-model="relationForm.engineerManagerEmployeeId"
          />
        </a-form-item> -->
        <a-form-item label="短视频拍摄" v-if="permission.includes('goldData_video_edit')">
          <employee-search
            placeholder="请选择短视频拍摄"
            :searchFn="artistSearch"
            dutyType="2"
            v-model="relationForm.shootEmployeeId"
          />
        </a-form-item>
        <a-form-item label="短视频后期" v-if="permission.includes('goldData_video_edit')">
          <employee-search
            placeholder="请选择短视频后期"
            :searchFn="artistSearch"
            dutyType="2"
            v-model="relationForm.edittingEmployeeId"
          />
        </a-form-item>
        <!-- <a-form-item label="后期组长" v-if="permission.includes('goldData_video_edit')">
          <employee-search
            placeholder="请选择后期组长"
            :searchFn="artistSearch"
            dutyType="2"
            v-model="relationForm.edittingManagerEmployeeId	"
          />
        </a-form-item> -->
      </a-form>
      <div class="drawer-footer">
        <a-button type="primary" @click="saveRelation">确定</a-button>
        <a-button type="primary" class="cancel margin-btn" @click="onClose">取消</a-button>
      </div>
    </a-drawer>
    <import-comp v-if="visibleImport" :visible="visibleImport" @cancel="visibleImport = false" />
    <import-relation-comp v-if="visibleRelationImport" :visible="visibleRelationImport" @cancel="visibleRelationImport = false" />
  </div>
</template>
<script>
import ImportComp from './components/ImportComp'
import ImportRelationComp from './components/ImportRelationComp'
import EmployeeSearch from './components/EmployeeSearch.vue'
import TabContent from './components/TabContent'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { goldListData, getExportArtist, getExportMedia, artistSearch, editArtistRelation, exportAllList, exportInfluencer } from '@/api/gold'
import { artistsColumns } from './tableColumns'
import Ellipsis from '@/components/Ellipsis'
// const ArtistPlainOptions = ['直播平台账号昵称', '抖音号', '抖音号（原）', '主播真实姓名', '主播生日', '主播联系电话', '个人微信', '现居城市', '直播方式', '主播类型', '主播评级', '才艺情况', '颜值评估', '互动能力', '初始粉丝量', '最高月流水等级', '备注', '签约情况', '招募姓名', '招募手机号', '入会时间', '直播平台账号ID', '运营人姓名', '运营人分公司']
// const MediaPlainOptions = ['短视频孵化线', '短视频孵化方式', '短视频介入孵化时粉丝量', '短视频策划', '归属团队', '策划组长', '短视频拍摄', '短视频接手时间', '短视频后期', '后期组长']
export default {
  name: 'ArtistsList',
  components: {
    STable,
    Ellipsis,
    TabContent,
    EmployeeSearch,
    ImportComp,
    ImportRelationComp
  },
  data () {
    return {
      loading: false,
      columns: [],
      form: this.$form.createForm(this),
      visible: false,
      ArtistCheckAll: false,
      MediaCheckAll: false,
      ArtistCheckedList: [],
      MediaCheckedList: [],
      ArtistPlainOptions: [],
      MediaPlainOptions: [],
      artistIndeterminate: true,
      mediaIndeterminate: true,
      queryParams: {
      },
      downloadParams: {},
      id: '',
      selectedRowKeys: [],
      relationVisible: false,
      visibleImport: false,
      visibleRelationImport: false,
      artistSearch,
      relationForm: {}
    }
  },
  created () {
    if (!this.permission.includes('goldData_operation_show') && !this.permission.includes('goldData_video_show') && !this.permission.includes('goldData_opt_export')) {
      this.columns = artistsColumns.filter(item => item.dataIndex !== 'action')
    } else {
      this.columns = artistsColumns
    }
  },
  mounted () {
    this.getArtistExport()
    this.getMediaExport()
  },
  methods: {
    loadDataHandle (parameter) {
      this.queryParams.signStartDate = this.queryParams.signDate ? this.queryParams.signDate[0] : undefined
      this.queryParams.signEndDate = this.queryParams.signDate ? this.queryParams.signDate[1] : undefined
      this.queryParams.firstEnteringDateOfInfluencerInfoEnd = this.queryParams.firstEnteringDateOfInfluencerInfo ? this.queryParams.firstEnteringDateOfInfluencerInfo[1] : undefined
      this.queryParams.firstEnteringDateOfInfluencerInfoStart = this.queryParams.firstEnteringDateOfInfluencerInfo ? this.queryParams.firstEnteringDateOfInfluencerInfo[0] : undefined
      this.queryParams.firstEnteringDateOfVideoInfoEnd = this.queryParams.firstEnteringDateOfVideoInfo ? this.queryParams.firstEnteringDateOfVideoInfo[1] : undefined
      this.queryParams.firstEnteringDateOfVideoInfoStart = this.queryParams.firstEnteringDateOfVideoInfo ? this.queryParams.firstEnteringDateOfVideoInfo[0] : undefined
      const requestParameters = Object.assign({}, parameter, this.queryParams)
      this.downloadParams = requestParameters
      return goldListData(requestParameters).then(res => {
        return res
      })
    },
    getArtistExport () {
      getExportArtist().then(res => {
        res.forEach(item => {
          item.label = item.value
          item.value = item.name
        })
        this.ArtistPlainOptions = res
      })
    },
    getMediaExport () {
      getExportMedia().then(res => {
        res.forEach(item => {
          item.label = item.value
          item.value = item.name
        })
        this.MediaPlainOptions = res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.queryParams = {}
      this.$refs.table.refresh(true)
    },
    searchHandle (e) {
      e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    showModal (id) {
      if (id) {
        this.id = id
      } else {
        this.id = ''
      }
      this.checkAll()
      this.visible = true
    },
    handleOk () {
      const parameter = {
        exportFields: [...this.ArtistCheckedList, ...this.MediaCheckedList]
      }
      if (parameter.exportFields.length === 0) {
        this.$notification['error']({
            message: '错误',
            description: '请选择导出字段',
            duration: 2
          })
        return
      }
      const requestParameters = Object.assign({}, parameter, this.downloadParams)
      this.createUrl(requestParameters)
    },
    detailHandle (id, type) {
      if (type === 1) {
        this.$router.push({
          path: '/artists/gold/business-detail',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push({
          path: '/artists/gold/short-media',
          query: {
            id: id
          }
        })
      }
    },
    checkAll () {
      this.ArtistCheckedList = []
      this.MediaCheckedList = []
      this.ArtistPlainOptions.forEach(item => {
        this.ArtistCheckedList.push(item.value)
      })
      this.MediaPlainOptions.forEach(item => {
        this.MediaCheckedList.push(item.value)
      })
      this.ArtistCheckAll = true
      this.MediaCheckAll = true
    },
    eidtHandle (id) {
      this.$router.push({
        path: '/gold/detail',
        query: {
          id: id,
          edit: 1
        }
      })
    },
    download () {
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/afterGoldData/export/relation`
    },
    createUrl (searchParams) {
      if (this.id) {
        searchParams.influencerId = this.id
      }
      // var exportUrl = ''
      // Object.keys(searchParams).map((key) => {
      //     if (searchParams[key]) {
      //       exportUrl += key + '=' + searchParams[key] + '&'
      //     }
      // })
      this.visible = false
      if (this.id) {
        exportInfluencer(searchParams).then(res => {
          const url = window.URL.createObjectURL(res)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '金数据导出.xlsx')
          link.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(link)
        })
        // window.open(`${process.env.VUE_APP_API_BASE_URL}/afterGoldData/export/influencer?${exportUrl}`)
        // window.location.href = `${process.env.VUE_APP_API_BASE_URL}/afterGoldData/export/influencer?${exportUrl}`
      } else {
        exportAllList(searchParams).then(res => {
          const url = window.URL.createObjectURL(res)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '金数据导出.xlsx')
          link.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(link)
        })
        // window.open(`${process.env.VUE_APP_API_BASE_URL}/afterGoldData/export/list?${exportUrl}`)
        // window.location.href = `${process.env.VUE_APP_API_BASE_URL}/afterGoldData/export/list?${exportUrl}`
      }
    },
    onArtistCheckAllChange (e) {
      const arr = this.ArtistPlainOptions.map((item, index) => {
        return item.value
      }).join(',').split(',')
      Object.assign(this, {
        ArtistCheckedList: e.target.checked ? arr : [],
        artistIndeterminate: false,
        ArtistCheckAll: e.target.checked
      })
    },
    onMediaCheckAllChange (e) {
      const arr = this.MediaPlainOptions.map((item, index) => {
        return item.value
      }).join(',').split(',')
      Object.assign(this, {
        MediaCheckedList: e.target.checked ? arr : [],
        mediaIndeterminate: false,
        MediaCheckAll: e.target.checked
      })
    },
    onArtistChange (checkedList) {
      this.artistIndeterminate = !!checkedList.length && checkedList.length < this.ArtistPlainOptions.length
      this.ArtistCheckAll = checkedList.length === this.ArtistPlainOptions.length
    },
    onMediaChange (checkedList) {
      this.mediaIndeterminate = !!checkedList.length && checkedList.length < this.MediaPlainOptions.length
      this.MediaCheckAll = checkedList.length === this.MediaPlainOptions.length
    },
    onChange () {

    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    relationEdit () {
      if (this.selectedRowKeys.length === 0) {
         this.$notification['error']({
            message: '错误',
            description: '请选择主播',
            duration: 4
          })
        return
      }
      this.relationVisible = true
    },
    onClose () {
      this.relationVisible = false
    },
    saveRelation () {
      const params = {}
      for (var i in this.relationForm) {
        if (this.relationForm[i]) {
          params[i] = this.relationForm[i].key
        }
      }
      editArtistRelation({
        tiktokLiveInfoId: this.selectedRowKeys,
        ...params
      }).then(res => {
        this.$notification['success']({
          message: '提示',
          description: '操作成功',
          duration: 2
        })
        this.relationForm = {}
        this.relationVisible = false
        this.$refs.table.refresh()
      })
    },
    toRelation () {
      this.$router.push({
        path: '/artists/gold/relation-list'
      })
    },
    importHandle () {
      this.visibleImport = true
    },
    importRelationHandle () {
      this.visibleRelationImport = true
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
.dd-con {
    padding: 10px;
    border-radius: 2px;
    background-color: rgba(117,93,215, .05);
    dd {
      margin-bottom: 2px;
    }
  }
  .btn-import{
    position: absolute;
    right: 24px;
    top: 24px;
  }
  .upload-input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0;
  }
  .del-upload{
    display: inline-block;
    margin-left: 5px;
    &:hover{
      color: #755dd7;
    }
  }

</style>
