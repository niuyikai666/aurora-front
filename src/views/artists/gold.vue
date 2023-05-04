<template>
  <a-card :bordered="false">
    <div class="sign-info-content">
      <a-form class="form" :form="form">
        <tab-content title="签约信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item label="公会经纪人">
                <search-agent
                  v-decorator="['agentName', {rules: [{ required: true, message: '请选择公会经纪人'}], initialValue: signModel.agentName}]"
                  placeholder="请输入"
                  :searchFn="agentSearch"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item label="主播运营人">
                <search-employee
                  v-decorator="['operatorEmployeeId', {rules: [{ required: true, message: '请选择主播运营人'}], initialValue: signModel.operatorEmployeeId}]"
                  placeholder="请输入"
                  :searchFn="artistSearch2"
                  @department="changeDepartment"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="运营人分公司">
                <span>{{ signModel.fullDepartmentName ? signModel.fullDepartmentName : '--' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="isDays">
              <a-form-item
                label="招募人为无忧员工">
                <a-select
                  v-decorator="['isInRecruit',{ rules: [{ required: true, message: '请选择是否为无忧员工'}] }]"
                  @change="changeRecruitType"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in isInRecruit" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="isDays">
              <a-form-item
                label="招募姓名">
                <search-employee
                  v-if="form.getFieldValue('isInRecruit')"
                  v-decorator="['recruitEmployeeId', {rules: [{ required: true, message: '请选择招募人'}], initialValue: signModel.recruitEmployeeId}]"
                  placeholder="请输入"
                  :searchFn="artistSearch"
                />
                <a-input placeholder="请输入招募姓名" v-decorator="['recruitName',{rules: [{ required: true, message: '请输入招募姓名'}]}]" v-else/>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('isInRecruit') === 0 && isDays">
              <a-form-item
                label="招募手机号">
                <a-input placeholder="请输入招募手机号" v-decorator="['recruitMobile',{rules: [{ required: false, message: '请输入正确招募手机号', pattern: /^1[123456789]\d{9}$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="是否为讲师招募">
                <a-select
                  v-decorator="['isLecturer',{rules: [{ required: true, message: '请选择是否为讲师招募'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in isInTeacher" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('isLecturer')">
              <a-form-item
                label="讲师姓名">
                <search-employee
                  v-decorator="['lecturerEmployeeId', {rules: [{ required: true, message: '请选择讲师'}], initialValue: signModel.lecturerEmployeeId}]"
                  placeholder="请输入"
                  :searchFn="artistSearch"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="身份信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播账号ID">
                <a-input placeholder="请输入主播账号ID" @blur="changeId" v-decorator="['platformCode',{rules: [{ required: true, message: '请输入主播账号ID'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="账号所属平台">
                <a-select
                  v-decorator="['platformType',{rules: [{ required: true, message: '请选择账号所属平台'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in platformTypeList" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播账号的昵称">
                <a-input placeholder="请输入直播平台账号的昵称" v-decorator="['nickName',{rules: [{ required: true, message: '请输入直播平台账号的昵称'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播真实姓名">
                <a-input placeholder="请输入主播的直播平台认证真实姓名" v-decorator="['realName', { rules: [{ required: true, message: '请输入主播的直播平台认证真实姓名' }], validateTrigger: ['change', 'blur']}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="现居城市">
                <a-cascader
                  v-decorator="['addressCode', {initialValue: signModel.areaCode, rules: [{ required: true, message: '请选择现居住城市'}]}]"
                  :options="areaData"
                  placeholder="请选择省/市/区"
                  expand-trigger="hover"
                  @change="onAreaChange"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item label="主播生日">
                <a-date-picker
                  style="width: 100%"
                  placeholder="请选择日期"
                  value-format="YYYY-MM-DD"
                  v-decorator="['birthday', {rules: [{ required: true, message: '请选择主播生日'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播微信号">
                <a-input placeholder="请输入主播的微信号" v-decorator="['wechat', {rules: [{ required: true, message: '请输入主播微信号', pattern: /^(?=.*\S).+$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播手机号">
                <a-input placeholder="请输入主播的手机号" v-decorator="['tel',{rules: [{ required: true, message: '请输入正确手机号', pattern: /^1[23456789]\d{9}$/}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="基本信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="直播方式">
                <a-select
                  v-decorator="['liveType',{rules: [{ required: true, message: '请选择直播方式'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in liveType" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="所属品类">
                <a-select
                  v-decorator="['category',{rules: [{ required: true, message: '请选择所属品类'}]}]"
                  placeholder="请选择"
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
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播评级">
                <a-select
                  v-decorator="['rate']"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in rate" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="才艺情况">
                <a-select
                  v-decorator="['acquirement',{rules: [{ required: true, message: '请选择才艺情况'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in acquirement" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="才艺类型">
                <a-select
                  v-decorator="['talentCate',{rules: [{ required: true, message: '请选择才艺类型'}]}]"
                  placeholder="请选择"
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
            <a-col :xs="24" :md="8">
              <a-form-item
                label="颜值评估">
                <a-select
                  v-decorator="['appearance',{rules: [{ required: true, message: '请选择颜值评估'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in appearance" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="初始粉丝量">
                <a-input-number placeholder="请输入初始粉丝量" v-decorator="['initFans',{rules: [{ required: true, message: '请输入初始粉丝量',pattern: /^(?=.*\S).+$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="互动能力">
                <a-select
                  v-decorator="['interaction',{rules: [{ required: true, message: '请选择互动能力'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in interaction" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="加分技能">
                <a-select
                  v-decorator="['bonusSkill',{rules: [{ required: false, message: '请选择加分技能'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    滑雪
                  </a-select-option>
                  <a-select-option :value="2">
                    潜水
                  </a-select-option>
                  <a-select-option :value="3">
                    冲浪
                  </a-select-option>
                  <a-select-option :value="4">
                    做饭
                  </a-select-option>
                  <a-select-option :value="5">
                    美妆
                  </a-select-option>
                  <a-select-option :value="6">
                    手工
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="教育水平" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="学历">
                <a-select
                  v-decorator="['qualification',{rules: [{ required: true, message: '请选择学历'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    小学
                  </a-select-option>
                  <a-select-option :value="2">
                    初中
                  </a-select-option>
                  <a-select-option :value="3">
                    高中
                  </a-select-option>
                  <a-select-option :value="4">
                    中专
                  </a-select-option>
                  <a-select-option :value="5">
                    大专
                  </a-select-option>
                  <a-select-option :value="6">
                    本科
                  </a-select-option>
                  <a-select-option :value="7">
                    硕士
                  </a-select-option>
                  <a-select-option :value="8">
                    博士
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="毕业院校">
                <a-input
                  placeholder="请填写毕业院校"
                  :maxLength="50"
                  v-decorator="['graduation',{rules: [{ required: true, message: '请输入毕业院校'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="专业">
                <a-input
                  placeholder="请填写专业"
                  :maxLength="50"
                  v-decorator="['profession',{rules: [{ required: true, message: '请输入专业'}]}]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="附件" :titleLine="true" desc="单个图片大小请勿超过50M">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播照片">
                <a-upload
                  name="file"
                  accept="image/gif, image/jpeg, image/png"
                  :action="uploadUrl"
                  :showUploadList="false"
                  @change="handleChange2"
                  v-decorator="['actorPic', {rules: [{ required: true, message: '请选择主播照片'}]}]"
                >
                  <a-button> <a-icon type="upload" />上传图片</a-button>
                </a-upload>
                <viewer
                  v-if="actorPic"
                  :images="[baseUrl+actorPic]"
                  class="img-viewer"
                  style="display:inline-block;margin-left:10px;width:auto"
                >
                  <div class="images">
                    <img
                      :src="baseUrl + actorPic"
                      class="imgs"
                    >
                  </div>
                </viewer>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="首页截图">
                <a-upload
                  name="file"
                  accept="image/gif, image/jpeg, image/png"
                  :action="uploadUrl"
                  :showUploadList="false"
                  @change="handleChange"
                  v-decorator="['indexPicUrl']"
                >
                  <a-button> <a-icon type="upload" />上传图片</a-button>
                </a-upload>
                <viewer
                  v-if="indexPicUrl"
                  :images="[baseUrl+indexPicUrl]"
                  class="img-viewer"
                  style="display:inline-block;margin-left:10px;width:auto"
                >
                  <div class="images">
                    <img
                      :src="baseUrl+indexPicUrl"
                      class="imgs"
                    >
                  </div>
                </viewer>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="备注" :titleLine="true" desc="备注请勿超过200字">
          <a-form-item>
            <a-textarea
              v-decorator="['note']"
              placeholder="请输入"
              :maxLength="200"
              :auto-size="{ minRows: 2, maxRows: 4 }"
            />
          </a-form-item>
        </tab-content>
        <div class="btn-group">
          <a-button type="primary" icon="save" @click="handleSubmit">保存信息</a-button>
        </div>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import { fileds } from './fileds'
import { mapGetters } from 'vuex'
import { agentSearch, artistSearch2, artistSearch, saveInfluecer, getPrefillInfluencerInfo, checkInfluncerDays } from '@/api/gold'
import TabContent from './components/TabContent'
import searchAgent from './components/searchAgent'
import searchEmployee from './components/searchEmployee'
import areaData from '@/utils/areaData'
import pick from 'lodash.pick'
export default {
  components: {
    searchAgent,
    TabContent,
    searchEmployee
  },
  data () {
    return {
      fileds,
      areaData,
      form: this.$form.createForm(this),
      agentSearch,
      artistSearch2,
      artistSearch,
      signModel: {},
      isInRecruit: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      isInTeacher: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      platformTypeList: [
        { name: '抖音', value: 1 },
        { name: '火山', value: 2 }
      ],
      liveType: [
        { name: '娱乐直播', value: 1 },
        { name: '语音直播', value: 2 },
        { name: '电商直播', value: 3 }
      ],
      influencerType: ['音乐', '舞蹈', '情感', '互动聊天', '美食', '文教', '户外', '才艺', '运动', '颜值', '脱口秀', '搞笑', '人气PK', '电商', '其他'],
      rate: [
        { name: 'S', value: 'S' },
        { name: 'A', value: 'A' },
        { name: 'B', value: 'B' }
      ],
      acquirement: [
        { name: '优质才艺', value: 1 },
        { name: '普通才艺', value: 2 },
        { name: '无才艺', value: 3 }
      ],
      appearance: [
        { name: '高颜值', value: 1 },
        { name: '中等偏上', value: 2 },
        { name: '中等偏下', value: 3 },
        { name: '低颜值', value: 4 }
      ],
      interaction: [
        { name: '高', value: 1 },
        { name: '中', value: 2 },
        { name: '低', value: 3 }
      ],
      monthAmountType: [
        { name: '超头部主播', value: 1 },
        { name: '头部主播', value: 2 },
        { name: '核心主播', value: 3 },
        { name: '普通主播', value: 4 }
      ],
      signMethod: [
        { name: '全约', value: 1 },
        { name: '网签', value: 2 },
        { name: '未签约', value: 3 }
      ],
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      actorPic: '',
      indexPicUrl: '',
      address: '',
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      id: '',
      isDays: false
    }
  },

  mounted () {
    this.fileds.forEach(item => {
      this.form.getFieldDecorator(item)
    })
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getInfluencerInfo()
    }
    if (this.$route.query.platformType) {
      this.form.setFieldsValue({
        'platformType': Number(this.$route.query.platformType),
        'platformCode': this.$route.query.platformCode
      })
      this.checkDays(this.$route.query.platformCode)
      this.setOperater()
    }
    if (this.$route.query.data) {
      const data = JSON.parse(this.$route.query.data)
      this.form.setFieldsValue({
        'platformType': 1,
        'platformCode': data.tiktokCode,
        'operatorEmployeeId': {
            key: data.boundEmployeeId,
            label: data.boundOperatorName
        },
        'agentName': data.agentName,
        'nickName': data.nickName
      })
      this.checkDays(data.tiktokCode)
      this.changeDepartment(data.boundDepartmentName)
    }
  },

  methods: {
    getInfluencerInfo () {
      getPrefillInfluencerInfo(this.id).then(res => {
        this.indexPicUrl = res.indexPicUrl
        this.actorPic = res.actorPic || '/files/aurora/da6ba4a606e54141ad08e717d0149269.png'
        res.addressCode = res.addressCode ? res.addressCode.split(',') : []
        res.liveType = res.liveType ? res.liveType.code : undefined
        res.acquirement = res.acquirement ? res.acquirement.code : undefined
        res.appearance = res.appearance ? res.appearance.code : undefined
        res.interaction = res.interaction ? res.interaction.code : undefined
        res.monthAmountType = res.monthAmountType ? res.monthAmountType.code : undefined
        res.talentCate = res.talentCate ? res.talentCate.code : undefined
        res.category = res.category ? res.category.code : undefined
        res.qualification = res.qualification ? res.qualification.code : undefined
        res.bonusSkill = res.bonusSkill ? res.bonusSkill.code : undefined
        res.platformType = res.platformType ? res.platformType.code : undefined
        res.operatorEmployeeId && this.dealSearch(res, 'operatorEmployeeId', res.operatorEmployeeId, res.operatorEmployeeName)
        res.recruitEmployeeId && this.dealSearch(res, 'recruitEmployeeId', res.recruitEmployeeId, res.recruitName)
        res.lecturerEmployeeId && this.dealSearch(res, 'lecturerEmployeeId', res.lecturerEmployeeId, res.lecturerRecruitName)
        if (!res.recruitEmployeeId) res.recruitEmployeeId = undefined
        if (!res.lecturerEmployeeId) res.lecturerEmployeeId = undefined
        this.address = res.address
        this.signModel = res
        if (res.platformCode) this.checkDays(res.platformCode)
        this.form.setFieldsValue(pick(this.signModel, this.fileds))
        if (!this.signModel.operatorEmployeeId) {
          this.setOperater()
        }
      })
    },
    dealSearch (data, fileds, id, name) {
      data[fileds] = {
        key: id,
        label: name
      }
    },
    changeId (val) {
      this.$nextTick(() => {
        this.checkDays(this.form.getFieldValue('platformCode'))
      })
    },
    checkDays (val) {
      checkInfluncerDays({
        platformCode: val
      }).then(res => {
        this.isDays = res
        if (!res) {
          this.$message.error('该主播已入会14天，无法添加招募')
        }
      })
    },
    setOperater () {
      this.form.setFieldsValue({
        'operatorEmployeeId': {
          key: this.userId,
          label: this.nickname
        }
      })
      this.changeDepartment(this.departments)
    },
    changeDepartment (val) {
      this.signModel.fullDepartmentName = val
    },
    changeRecruitType () {
      this.form.setFieldsValue({
        'recruitName': undefined,
        'recruitEmployeeId': undefined
      })
      this.signMethod.recruitEmployeeId = undefined
    },
    handleChange2 (info) {
      if (info.file.status === 'done') {
        this.actorPic = info.file.response[0]
      }
      if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 图片上传失败.`)
      }
    },
    handleChange (info) {
      if (info.file.status === 'done') {
        this.indexPicUrl = info.file.response[0]
      }
      if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 图片上传失败.`)
      }
    },
    onAreaChange (value, area) {
      if (area) {
        area.forEach((item, index) => {
          if (index === 0) {
            this.address = item.label
          } else {
            this.address = `${this.address ? this.address : ''}/${item.label}`
          }
        })
      } else {
        this.address = ''
      }
    },
    handleSubmit () {
      setTimeout(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.addressCode = values.addressCode.join(',')
            values.operatorEmployeeId = values.operatorEmployeeId ? values.operatorEmployeeId.key : undefined
            values.lecturerEmployeeId = values.lecturerEmployeeId ? values.lecturerEmployeeId.key : undefined
            values.recruitEmployeeId = values.recruitEmployeeId ? values.recruitEmployeeId.key : undefined
            values.indexPicUrl = this.indexPicUrl
            values.actorPic = this.actorPic
            values.isInRecruit = this.isDays ? values.isInRecruit : undefined
            const params = {
              ...values,
              id: this.id || undefined,
              address: this.address
            }
            saveInfluecer(params).then(res => {
              this.$notification['success']({
                message: '提示',
                description: '操作成功',
                duration: 2
              })
              history.go(-1)
            })
          }
        })
      }, 100)
    }
  },
  computed: {
    ...mapGetters(['nickname', 'departments', 'userId'])
  }
}

</script>
<style lang='less' scoped>
.sign-content {
  padding-left: 8px;
}
.sign-info-content {
  /deep/ .tab-content {
    &:first-child {
      margin-top: 10px;
    }
    margin-top: 15px;
  }
}
.form {
  /deep/ .ant-form-item {
    // margin-bottom: 8px;
    padding-right: 30px;
    .ant-form-item-label > label {
      color: rgba(0,0,0,.45);
    }
  }
}
.btn-group {
  padding-left: 8px;
  margin-top: 15px;
  button {
    margin-right: 16px;
  }
}
.imgs{
  height: 30px;
}
.ant-input-number{
  width: 100%;
}
</style>
