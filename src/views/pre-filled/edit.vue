<template>
  <div class="artists-detail-content">
    <a-form class="form" :form="form">
      <a-card
        :bordered="false"
        style="margin-bottom:24px"
      >
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <a-form-item
              label="运营人">
              <span>{{ signModel.operatorName }}</span>
              <!-- <a-auto-complete
                style="width: 100%"
                placeholder=""
                option-label-prop="title"
                @search="onOperateSearch"
                disabled
                @select="onSelect"
                @blur="onBlur"
                v-decorator="['operatorName',{rules: [{ required: true, message: '请选择运营人'}]}]"
              >
                <template slot="dataSource">
                  <a-select-option v-for="item in operateSource" :key="item.id" :title="item.name">
                    <p style="margin:0">{{ item.name }}<span v-if="item.fullName">({{ item.fullName }})</span></p>
                  </a-select-option>
                </template>
                <a-input class="auto-input">
                  <a-icon slot="suffix" type="search" />
                </a-input>
              </a-auto-complete> -->
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="8">
            <a-form-item
              label="运营人分公司">
              <p class="crip">{{ signModel.fullName ? signModel.fullName : '--' }}</p>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card
        :borderd="false"
      >
        <tab-content title="签约信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="招募人为无忧员工">
                <a-select
                  v-decorator="['isInRecruit',{rules: [{ required: true, message: '请选择是否为无忧员工'}]}]"
                  @change="change"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in isInRecruit" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="招募姓名">
                <a-input placeholder="请输入招募姓名" v-decorator="['recruitName',{rules: [{ required: true, message: '请输入招募姓名',pattern: /^(?=.*\S).+$/}]}]" v-if="showRecruitType!=1"/>
                <a-auto-complete
                  style="width: 100%"
                  placeholder="请选择招募人"
                  option-label-prop="title"
                  @search="onAllSearch"
                  @select="onSelect1"
                  @blur="onBlur1"
                  v-if="showRecruitType==1"
                  v-decorator="['recruitName',{rules: [{ required: true, message: '请选择招募人'}]}]"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in allSource" :key="item.id" :title="item.name">
                      <p style="margin:0">{{ item.name }}<span v-if="item.fullName">({{ item.fullName }})</span></p>
                    </a-select-option>
                  </template>
                  <a-input class="auto-input">
                    <a-icon slot="suffix" type="search" />
                  </a-input>
                </a-auto-complete>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="!showRecruitType">
              <a-form-item
                label="招募手机号">
                <a-input placeholder="请输入招募手机号" v-decorator="['recruitMobile',{rules: [{ required: false, message: '请输入正确招募手机号', pattern: /^1[12345789]\d{9}$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="公会经纪人">
                <a-select
                  show-search
                  placeholder="请选择招公会经纪人"
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  @search="onAgentSearch"
                  v-decorator="['agentName',{rules: [{ required: true, message: '请选择公会经纪人'}]}]"
                >
                  <a-select-option v-for="d in agentSource" :key="d.name">
                    {{ d.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="是否为讲师招募">
                <a-select
                  v-decorator="['isLecturerRecruit',{rules: [{ required: true, message: '请选择是否为讲师招募'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in isInTeacher" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                v-if="form.getFieldValue('isLecturerRecruit') !== 0"
                label="讲师姓名">
                <a-auto-complete
                  style="width: 100%"
                  placeholder="请选择讲师姓名"
                  option-label-prop="title"
                  @search="teacherSearchHandle"
                  @select="onSelect3"
                  @blur="onBlur3"
                  v-decorator="['lecturerRecruitName',{rules: [{ required: true, message: '请选择讲师姓名'}]}]"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in teacherSource" :key="item.id" :title="item.name">
                      <span>{{ item.name }}({{ item.fullName }})</span>
                    </a-select-option>
                  </template>
                  <a-input class="auto-input">
                    <a-icon slot="suffix" type="search" />
                  </a-input>
                </a-auto-complete>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="身份信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="抖音号">
                {{ signModel.tiktokCode || '--' }}
              </a-form-item>
            </a-col>
            <!-- <a-col :xs="24" :md="8">
              <a-form-item
                label="火山号">
                <a-input placeholder="请输入火山号" v-decorator="['volcanoCode']" />
              </a-form-item>
            </a-col> -->
            <!-- <a-col :xs="24" :md="8">
              <a-form-item
                label="抖音号">
                <a-input disabled placeholder="请输入抖音号" v-decorator="['tiktokCode',{rules: [{ required: false, message: '请输入抖音号'}]}]" />
              </a-form-item>
            </a-col> -->
            <a-col :xs="24" :md="8">
              <a-form-item
                label="火山号">
                <a-input placeholder="请输入火山号" v-decorator="['volcanoCode',{rules: [{ required: false, message: '请输入火山号'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="直播平台账号昵称">
                <a-input placeholder="请输入直播平台账号昵称" v-decorator="['nickname',{rules: [{ required: true, message: '请输入直播平台账号昵称'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="真实姓名">
                <a-input placeholder="请输入主播的直播平台认证真实姓名" v-decorator="['realname', { rules: [{ required: true, message: '请输入主播的直播平台认证真实姓名', pattern: /^(?=.*\S).+$/ }], validateTrigger: ['change', 'blur']}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="现居城市">
                <a-cascader
                  v-decorator="['addressCode', {initialValue: signModel.areaCode, rules: [{ required: true, message: '请选择现居住城市'}]}]"
                  :options="areaData"
                  change-on-select
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
                label="个人微信">
                <a-input placeholder="请输入主播的个人微信号" v-decorator="['wechat', {rules: [{ required: true, message: '请输入个人微信', pattern: /^(?=.*\S).+$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="联系电话">
                <a-input placeholder="请输入主播的手机号" v-decorator="['tel',{rules: [{ required: true, message: '请输入正确手机号', pattern: /^1[12345789]\d{9}$/}]}]" />
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
                label="才艺类型">
                <a-select
                  v-decorator="['talentCategory',{rules: [{ required: true, message: '请选择才艺类型'}]}]"
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
                label="初始粉丝量">
                <a-input-number placeholder="请输入初始粉丝量" v-decorator="['initFans',{rules: [{ required: true, message: '请输入初始粉丝量',pattern: /^(?=.*\S).+$/}]}]" :min="0"/>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="最高月流水等级">
                <a-select
                  v-decorator="['monthAmountType']"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in monthAmountType" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="首页截图">
                <a-upload
                  accept="image/gif, image/jpeg, image/png"
                  name="file"
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
                label="专业">
                <a-input
                  placeholder="请填写专业"
                  :maxLength="50"
                  v-decorator="['profession',{rules: [{ required: true, message: '请输入专业'}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="所属品类">
                <a-select
                  v-decorator="['actorCategory',{rules: [{ required: true, message: '请选择所属品类'}]}]"
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
                      :src="baseUrl+actorPic"
                      class="imgs"
                    >
                  </div>
                </viewer>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <div class="btn-group">
          <a-popconfirm
            overlayClassName="popoer-del"
            title="提交后内容将不可修改，请您仔细检查填写内容?"
            ok-text="确认提交"
            cancel-text="取消"
            @confirm="handleSubmit"
          >
            <a-button type="primary">保存信息</a-button>
          </a-popconfirm>
        </div>
      </a-card>
    </a-form>

  </div>
</template>

<script>
import TabContent from './components/TabContent'
import { artistSearch, artistSignSearch, agentSearch } from '@/api/gold'
import { saveInformation } from '@/api/pre-filled'
import { fileds } from './fileds'
import areaData from '@/utils/areaData'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      fileds,
      depart: [],
      areaData,
      signModel: {},
      form: this.$form.createForm(this),
      address: '',
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      indexPicUrl: '',
      actorPic: '',
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
        { name: '全约', value: 3 }
      ],
      isInRecruit: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      isInTeacher: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      operatorDepartment: [],
      allSource: [],
      agentSource: [],
      operateSource: [],
      signSource: [],
      teacherSource: [],
      timer: '',
      treeData: [],
      operatorDepartmentId: [],
      showRecruitType: false,
      loading: true,
      type: '',
      account: ''
    }
  },
  components: {
    TabContent,
    ATextarea
  },

  mounted () {
    this.account = this.$route.query.code
    // 防止表单未注册
    this.fileds.forEach(item => {
      this.form.getFieldDecorator(item)
    })
    this.setMessage()
  },

  methods: {
    setMessage () {
      const user = JSON.parse(JSON.parse(localStorage.getItem('User-Info')))
      this.signModel.operatorEmployeeId = user.id
      this.signModel.fullName = user.departmentName
      this.signModel.operatorName = user.name
      this.signModel.tiktokCode = this.account
      this.form.setFieldsValue({
        'operatorName': user.name
      })
    },
    handleSubmit () {
      setTimeout(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (values.addressCode || values.addressCode.length === 0) {
              values.addressCode = values.addressCode.join(',')
            }
            if (values.influencerType) {
              values.influencerType = values.influencerType.join(',')
            }
            if (this.showRecruitType) {
              values.recruitEmployeeId = this.signModel.recruitEmployeeId
              if (!this.signModel.recruitEmployeeId) {
                this.$message.error('该招募人不存在')
                return
              }
            } else {
              values.recruitEmployeeId = undefined
            }
            if (!this.signModel.operatorEmployeeId) {
              this.$message.error('该运营人不存在')
              return
            }
            values.indexPicUrl = this.indexPicUrl
            values.actorPic = this.actorPic
            const params = {
              ...values,
              operatorEmployeeId: this.signModel.operatorEmployeeId,
              signedEmployeeId: this.signModel.signedEmployeeId,
              lecturerRecruitEmployeeId: this.signModel.lecturerRecruitEmployeeId,
              address: this.address,
              tiktokCode: this.signModel.tiktokCode
            }
            saveInformation(params).then(res => {
              this.$notification['success']({
                message: '提示',
                description: '操作成功',
                duration: 2
              })
              this.$router.push({
                path: '/artists/pre-filled/list'
              })
            })
          }
        })
      }, 100)
    },
    cancelHandle () {
      this.$emit('editFinish')
    },
    subStr (str) {
      if (!str) return
      // eslint-disable-next-line no-useless-escape
      const index = str.lastIndexOf('\/')
      return str.substring(index + 1, str.length)
    },
    handleChange (info) {
      if (info.file.status === 'done') {
        this.indexPicUrl = info.file.response[0]
      }
      if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 图片上传失败.`)
      }
    },
    handleChange2 (info) {
      if (info.file.status === 'done') {
        this.actorPic = info.file.response[0]
      }
      if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 图片上传失败.`)
      }
    },
    eforeUpload (file, fileList) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      return isJPG && isLt5M
      // eslint-disable-next-line no-unreachable
      // eslint-disable-next-line no-unreachable
      // this.fileList.push(fileList)
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
    // dataSearchHandle (query) {
    //   artistInfoSearch({ name: query }).then(res => {
    //     this.dataSource = []
    //     if (res.length > 0) {
    //       this.dataSource = res.map(item => {
    //         item.id = item.id + ''
    //         return item
    //       })
    //     }
    //   })
    // },
    onSelect (value, option) {
      const data = this.filterData(1, option.key)
      this.setData(data)
    },
    onSelect1 (value, option) {
      const data = this.filterData(2, option.key)
      this.setData1(data)
    },
     onSelect2 (value, option) {
      const data = this.filterData(3, option.key)
      this.setData2(data)
    },
    onSelect3 (value, option) {
      const data = this.filterData(4, option.key)
      this.setData3(data)
    },
    onBlur (value) {
      if (!value) {
        return false
      }
      const data = this.filterData(1, value)
      this.setData(data)
    },
    onBlur1 (value) {
      if (!value) {
        return false
      }
      const data = this.filterData(2, value)
      this.setData1(data)
    },
    onBlur2 (value) {
      if (!value) {
        return false
      }
      const data = this.filterData(3, value)
      this.setData2(data)
    },
    onBlur3 (value) {
      if (!value) {
        return false
      }
      const data = this.filterData(4, value)
      this.setData3(data)
    },
    setData (data) {
      if (!data) {
        this.$message.error('该运营人不存在')
        return
      }
      this.signModel.operatorEmployeeId = data.id
      this.signModel.fullName = data.fullName
    },
    setData1 (data) {
      if (!data) {
        this.$message.error('该招募人不存在')
        this.signModel.recruitEmployeeId = ''
        return
      }
      this.signModel.recruitEmployeeId = data.id
    },
    setData2 (data) {
      if (!data) {
        this.$message.error('该签约人不存在')
        this.signModel.signedEmployeeId = ''
        return
      }
      this.signModel.signedEmployeeId = data.id
    },
    setData3 (data) {
      if (!data) {
        this.$message.error('该讲师不存在')
        this.signModel.lecturerRecruitEmployeeId = ''
        return
      }
      this.signModel.lecturerRecruitEmployeeId = data.id
    },
    filterData (type, val) {
      var data = ''
      if (type === 1) {
        data = this.operateSource.filter(item => item.id === val)[0] || this.operateSource.filter(item => item.name === val)[0]
      } else if (type === 2) {
        data = this.allSource.filter(item => item.id === val)[0] || this.allSource.filter(item => item.name === val)[0]
      } else if (type === 3) {
        data = this.signSource.filter(item => item.id === val)[0] || this.signSource.filter(item => item.name === val)[0]
      } else if (type === 4) {
        data = this.teacherSource.filter(item => item.id === val)[0] || this.teacherSource.filter(item => item.name === val)[0]
      }
      return data
    },
    onAllSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.allSearchHandle(query)
      }, 200)
    },
    onAgentSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.agentSearchHandle(query)
      }, 200)
    },
    onOperateSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.operateSearchHandle(query)
      }, 200)
    },
    allSearchHandle (query) {
      artistSearch({ name: query }).then(res => {
        this.allSource = []
        if (res.length > 0) {
          this.allSource = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    agentSearchHandle (query) {
      agentSearch({ searchName: query }).then(res => {
        this.agentSource = res.map(item => ({
          name: item
        }))
      })
    },
    operateSearchHandle (query) {
      artistSearch({ name: query, dutyType: 1 }).then(res => {
        this.operateSource = []
        if (res.length > 0) {
          this.operateSource = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    teacherSearchHandle (query) {
      artistSearch({ name: query }).then(res => {
        this.teacherSource = []
        if (res.length > 0) {
          this.teacherSource = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    onSignSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.signSearchHandle(query)
      }, 200)
    },
    signSearchHandle (query) {
      artistSignSearch({ searchName: query }).then(res => {
        this.signSource = []
        if (res.length > 0) {
          this.signSource = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    // getStructureHandle () {
    //   getStructure().then(res => {
    //     const tree = this.toTree(res)
    //     this.treeData = this.generateTree(tree)
    //   })
    // },
    generateTree (arr) {
      arr.forEach(item => {
        item['label'] = item.name
        item['value'] = item.id
        if (item.children) {
          this.generateTree(item.children)
        }
        return item
      })
      return arr
    },
    toTree (data) {
      const self = this
      const arr = []
      var temp = 1
      function createTree (id, array, list) {
        if (id > 500) return
        var newArr = list.filter(item => item.parentId === id)
        if (newArr.length <= 0) {
          temp = temp + 1
          if (!self.checkExist(list, temp)) {
            createTree(temp, arr, list)
          } else {
            temp = temp + 1
            if (!self.checkExist(list, temp)) {
              createTree(temp, arr, list)
            }
          }
          return array
        } else {
          newArr.forEach(item => {
            const arr = []
            item.children = createTree(item.id, arr, list)
            array.push(item)
          })
          return array
        }
      }
      createTree(temp, arr, data)
      return arr
    },
    checkExist (data, id) {
      var ids = []
      for (var i = 0; i < data.length; i++) {
        ids.push(data[i].id)
      }
      if (ids.indexOf(id) > -1) {
        return true
      } else {
        return false
      }
    },
    change (e) {
      if (e === 1) {
        this.showRecruitType = true
      } else {
        this.showRecruitType = false
      }
      this.form.setFieldsValue({
        'recruitName': ''
      })
      this.signModel.recruitEmployeeId = ''
    },
    changeForm (props, values) {
    }
  }
}

</script>
<style lang='less' scoped>
@import './edit.less';
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
.sign-content{
  /deep/ .ant-form-item-label{
    line-height: 40px;
  }
  /deep/ .ant-form-explain{
    margin-top: -2px;
  }
}
</style>
