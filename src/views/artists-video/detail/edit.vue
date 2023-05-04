<template>
  <a-card :bordered="false">
    <div class="sign-info-content">
      <a-form class="form" :form="form">
        <tab-content title="签约信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item label="主播运营人">
                <search-employee
                  v-if="type===2"
                  v-decorator="['operatorEmployeeId', {rules: [{ required: true, message: '请选择主播运营人'}], initialValue: signModel.operatorEmployeeId}]"
                  placeholder="请输入"
                  :searchFn="artistSearch"
                  :params="{dutyType: 1}"
                  @department="changeDepartment"
                />
                <span v-else> {{ signModel.operatorName }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="运营人所在组织">
                <span>{{ signModel.fullDepartmentName ? signModel.fullDepartmentName : '--' }}</span>
              </a-form-item>
            </a-col>

            <a-col :xs="24" :md="8">
              <a-form-item
                label="招募人为无忧员工">
                <a-radio-group
                  v-if="type === 2"
                  v-decorator="['recruitType',{ rules: [{ required: true, message: '请选择'}], initialValue: 1 }]"
                  @change="changeRecruitType"
                >
                  <a-radio v-for="(item, index) in isInRecruit" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-radio>
                </a-radio-group>
                <span v-if="type === 1">{{ signModel.recruitType === 1 ? '是' : (signModel.recruitType === null ? '-' : '否') }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('recruitType') === 0 || form.getFieldValue('recruitType') === 1">
              <a-form-item
                label="招募姓名">
                <search-employee
                  v-if="form.getFieldValue('recruitType') === 1 && type === 2"
                  v-decorator="['recruitEmployeeId', {rules: [{ required: true, message: '请选择招募人'}], initialValue: signModel.recruitEmployeeId}]"
                  placeholder="请输入"
                  :searchFn="artistSearch"
                />
                <a-input placeholder="请输入招募姓名" v-decorator="['recruitName',{rules: [{ required: true, message: '请输入招募姓名'}]}]" v-if="form.getFieldValue('recruitType') === 0 && type === 2"/>
                <span v-if="type === 1">{{ signModel.recruitName }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('recruitType') === 0">
              <a-form-item
                label="招募手机号">
                <a-input v-if="type === 2" placeholder="请输入招募手机号" v-decorator="['recruitMobile',{rules: [{ required: true, message: '请输入正确招募手机号', pattern: /^1[123456789]\d{9}$/}]}]" />
                <span v-if="type === 1">{{ signModel.recruitMobile }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="讲师为无忧员工">
                <a-radio-group
                  v-if="type === 2"
                  v-decorator="['lecturerType',{ rules: [{ required: true, message: '请选择'}], initialValue: 1 }]"
                  @change="changeLectureType"
                >
                  <a-radio v-for="(item, index) in isInTeacher" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-radio>
                </a-radio-group>
                <span v-if="type === 1">{{ isInTeacher.find(item => item.value === signModel.lecturerType) ? isInTeacher.find(item => item.value === signModel.lecturerType).name : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('lecturerType') === 1 || form.getFieldValue('lecturerType') === 2">
              <a-form-item
                label="讲师姓名">
                <search-employee
                  v-if="form.getFieldValue('lecturerType') === 1 && type === 2"
                  v-decorator="['lecturerEmpId', {rules: [{ required: true, message: '请选择讲师'}], initialValue: signModel.lecturerEmpId}]"
                  placeholder="请输入"
                  :searchFn="artistSearch"
                />
                <a-input placeholder="请输入讲师姓名" v-decorator="['lectureName',{rules: [{ required: true, message: '请输入讲师姓名'}]}]" v-if="form.getFieldValue('lecturerType') !== 1 && type === 2"/>
                <span v-if="type === 1">{{ signModel.lectureName }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('lecturerType') === 2">
              <a-form-item
                label="讲师手机号">
                <a-input v-if="type === 2" placeholder="请输入讲师手机号" v-decorator="['lectureMobile',{rules: [{ required: true, message: '请输入正确讲师手机号', pattern: /^1[123456789]\d{9}$/}]}]" />
                <span v-if="type === 1">{{ signModel.lectureMobile }}</span>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="入会信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <description title="在会状态">
                <p class="crip">{{ signModel.retired ? '退会' : (signModel.retired === null ? '-' : '在会') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="入会时间">
                <p class="crip">{{ signModel.joinGuildDate || '-' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="退会时间">
                <p class="crip">{{ signModel.retiredDate || '-' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="签约状态">
                <p class="crip">{{ signModel.signMethod ? signModel.signMethod.msg : '-' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="签约人">
                <p class="crip">{{ signModel.signEmpName || '-' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="到期时间">
                <p class="crip">{{ signModel.signExpiration || '-' }}</p>
              </description>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="身份信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播视频号ID">
                <a-input v-if="type === 2" placeholder="请输入主播视频号ID" v-decorator="['platformCode',{rules: [{ required: true, message: '请输入主播视频号IDD'}]}]" />
                <span v-else>{{ signModel.platformCode }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播视频号昵称">
                <a-input v-if="type === 2" placeholder="请输入主播视频号昵称" v-decorator="['nickName',{rules: [{ required: true, message: '请输入主播视频号昵称'}]}]" />
                <span v-else>{{ signModel.nickName }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播视频号微信">
                <a-input placeholder="请输入主播视频号微信" v-decorator="['wechat', {rules: [{ required: true, message: '请输入主播视频号微信', pattern: /^(?=.*\S).+$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="联系电话">
                <a-input placeholder="请输入联系电话" v-decorator="['tel',{rules: [{ required: true, message: '请输入正确联系电话', pattern: /^1[23456789]\d{9}$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="主播真实姓名">
                <a-input placeholder="请输入主播的直播平台认证真实姓名" v-decorator="['realName', { rules: [{ required: true, message: '请输入主播的直播平台认证真实姓名' }], validateTrigger: ['change', 'blur']}]" />
              </a-form-item>
            </a-col>
            <!-- <a-col :xs="24" :md="8">
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
            </a-col> -->
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
                label="视频号是否创建7天内">
                <a-radio-group
                  v-decorator="['createRecent',{ rules: [{ required: true, message: '请选择'}] }]"
                >
                  <a-radio v-for="(item, index) in createRecentType" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="基本信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="KOL垂类">
                <a-select
                  v-decorator="['kolType']"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in kolType" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="有无外站平台账号">
                <a-radio-group
                  v-decorator="['otherPlatformType',{ rules: [{ required: true, message: '请选择'}], initialValue: 1 }]"
                >
                  <a-radio v-for="(item, index) in otherPlatformType" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('otherPlatformType') === 1">
              <a-form-item
                label="外站平台名称">
                <a-input placeholder="请输入外站平台名称" v-decorator="['otherPlatform', { rules: [{ required: true, message: '请输入外站平台名称' }]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('otherPlatformType') === 1">
              <a-form-item
                label="外站平台昵称">
                <a-input placeholder="请输入外站平台昵称" v-decorator="['otherPlatformName', { rules: [{ required: true, message: '请输入外站平台昵称' }]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('otherPlatformType') === 1">
              <a-form-item
                label="外站粉丝数">
                <a-input-number placeholder="请输入外站粉丝数" v-decorator="['otherFans',{rules: [{ required: true, message: '请输入外站粉丝数',pattern: /^(?=.*\S).+$/}]}]" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" v-if="form.getFieldValue('otherPlatformType') === 1">
              <a-form-item
                label="当前是否直播">
                <a-select
                  v-decorator="['liveNow',{ rules: [{ required: true, message: '请选择'}] }]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in liveNowType" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="24" v-if="form.getFieldValue('otherPlatformType') === 1">
              <a-form-item
                label="外站10W粉以上平台主页链接">
                <a-input placeholder="请输入外站10W粉以上平台主页链接" v-decorator="['otherUrl', { rules: [{ required: true, message: '请输入外站10W粉以上平台主页链接' }]}]" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item
                label="事迹/外部影响力"
              >
                <a-textarea
                  v-decorator="['deed']"
                  placeholder="请输入"
                  :maxLength="200"
                  :auto-size="{ minRows: 2, maxRows: 4 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <div class="btn-group">
          <a-button type="primary" @click="changeEdit" style="margin-right:10px">返回</a-button>
          <a-button type="primary" @click="handleSubmit">保存信息</a-button>
        </div>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import { fileds } from '../fileds'
import { mapGetters } from 'vuex'
import { agentSearch, artistSearch } from '@/api/gold'
import { getPrefillInfluencerInfo, editPrefill, editInfluencer } from '@/api/artists-video'
import TabContent from '../components/TabContent'
import searchEmployee from '../components/searchEmployee'
import Description from '../components/Description'
import pick from 'lodash.pick'
export default {
  components: {
    TabContent,
    searchEmployee,
    Description
  },
  data () {
    return {
      fileds,
      form: this.$form.createForm(this),
      agentSearch,
      artistSearch,
      signModel: {},
      createRecentType: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      isInRecruit: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      otherPlatformType: [
        { name: '有', value: 1 },
        { name: '无', value: 0 }
      ],
      liveNowType: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      isInTeacher: [
        { name: '是', value: 1 },
        { name: '否', value: 2 },
        { name: '无讲师', value: 0 }
      ],
      kolType: [
        { name: '时尚', value: 1 },
        { name: '美妆', value: 2 },
        { name: '乐器', value: 3 },
        { name: '颜值', value: 4 },
        { name: '歌手', value: 5 },
        { name: '其他', value: 6 }
      ],
      id: '',
      loading: false,
      type: ''
    }
  },

  mounted () {
    this.fileds.forEach(item => {
      this.form.getFieldDecorator(item)
    })
    this.type = this.$route.query.type ? Number(this.$route.query.type) : ''
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getInfluencerInfo()
    } else {
      this.setOperater()
    }
    if (this.$route.query.platformCode) {
      this.form.setFieldsValue({
        'platformCode': this.$route.query.platformCode
      })
    }
    // if (this.$route.query.data) {
    //   const data = JSON.parse(this.$route.query.data)
    //   this.form.setFieldsValue({
    //     'platformType': 1,
    //     'platformCode': data.tiktokCode,
    //     'operatorEmployeeId': {
    //         key: data.boundEmployeeId,
    //         label: data.boundOperatorName
    //     },
    //     'agentName': data.agentName,
    //     'nickName': data.nickName
    //   })
    //   this.changeDepartment(data.boundDepartmentName)
    // }
  },

  methods: {
    getInfluencerInfo () {
      getPrefillInfluencerInfo({
        id: this.id,
        type: this.type
      }).then(res => {
        res.fullDepartmentName = res.operatorDepartmentName
        res.lecturerType = res.lecturerType.code
        res.kolType = res.kolType ? res.kolType.code : undefined
        res.operatorEmployeeId && this.dealSearch(res, 'operatorEmployeeId', res.operatorEmployeeId, res.operatorName)
        res.recruitEmployeeId && this.dealSearch(res, 'recruitEmployeeId', res.recruitEmployeeId, res.recruitName)
        res.lecturerEmpId && this.dealSearch(res, 'lecturerEmpId', res.lecturerEmpId, res.lectureName)
        if (!res.recruitEmployeeId) res.recruitEmployeeId = undefined
        if (!res.lecturerEmpId) res.lecturerEmpId = undefined
        this.signModel = res
        this.form.setFieldsValue(pick(this.signModel, this.fileds))
        console.log(this.signModel)
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
    setOperater () {
      console.log(this.userId)
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
      this.signModel.recruitEmployeeId = undefined
    },
    changeLectureType () {
      this.form.setFieldsValue({
        'lectureName': undefined,
        'lecturerEmpId': undefined
      })
      this.signModel.lecturerEmpId = undefined
    },
    handleSubmit () {
      setTimeout(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.operatorEmployeeId = values.operatorEmployeeId ? values.operatorEmployeeId.key : undefined
            values.lecturerEmpId = values.lecturerEmpId ? values.lecturerEmpId.key : undefined
            values.recruitName = values.recruitEmployeeId ? values.recruitEmployeeId.label : values.recruitName
            values.recruitEmployeeId = values.recruitEmployeeId ? values.recruitEmployeeId.key : undefined
            const params = {
              ...values,
              id: this.id || undefined
            }
            if (this.loading) return
            this.loading = true
            if (this.type === 2) {
              editPrefill(params).then(res => {
                this.$notification['success']({
                  message: '提示',
                  description: '操作成功',
                  duration: 2
                })
                this.loading = false
                this.$emit('change')
              }).catch((err) => {
                console.log(err)
                this.loading = false
              })
            } else {
              editInfluencer(params).then(res => {
                this.$notification['success']({
                  message: '提示',
                  description: '操作成功',
                  duration: 2
                })
                this.loading = false
                this.$emit('change')
                // history.go(-1)
              }).catch((err) => {
                console.log(err)
                this.loading = false
              })
            }
          }
        })
      }, 100)
    },
    changeEdit () {
      this.$emit('change')
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
  /deep/ .crip{
    color: rgba(0,0,0,.65);
    font-weight: normal;
  }
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
  display: flex;
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
