<template>
  <a-spin :spinning="loading">
    <div class="sign-info-content">
      <a-form class="form" :form="form">
        <!-- <tab-content title="ID信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="快手昵称">
                <a-input placeholder="请输入快手昵称" v-decorator="['snackvideoNickName']" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="快手ID">
                <a-input placeholder="请输入快手ID" v-decorator="['snackvideoId']" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="快手数字ID">
                <a-input placeholder="请输入快手数字ID" v-decorator="['snackvideoCode']" />
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content> -->
        <tab-content title="孵化信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="短视频孵化线">
                <a-select
                  v-decorator="['operationType']"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in operationType" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="短视频孵化方式">
                <a-select
                  v-decorator="['operationMethod', {rules: [{ required: true, message: '请选择短视频孵化方式'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in operationMethod" :key="index" :value="item.value">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="短视频介入孵化时粉丝量"
                v-if="signModel.operationInitFans ==null">
                <a-input-number placeholder="请输入短视频介入孵化时粉丝量" v-decorator="['operationInitFans']" :min="0"/>
              </a-form-item>
              <a-form-item
                label="短视频介入孵化时粉丝量"
                v-if="signModel.operationInitFans != null">
                <p class="mb0">{{ signModel.operationInitFans }}</p>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="策划信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="短视频策划">
                <a-auto-complete
                  style="width: 100%"
                  placeholder="请选择短视频策划"
                  option-label-prop="title"
                  @search="onSearch"
                  @select="onCeHuaSelect"
                  @blur="onCeHuaBlur"
                  v-decorator="['engineerName']"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in dataSource" :key="item.id" :title="item.name">
                      <p>{{ item.name }}<span v-if="item.fullName">（{{ item.fullName }}）</span></p>
                    </a-select-option>
                  </template>
                  <a-input class="auto-input">
                    <a-icon slot="suffix" type="search" />
                  </a-input>
                </a-auto-complete>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="归属团队">
                <p class="mb0">{{ signModel.engineerEmployeeDepartment ? signModel.engineerEmployeeDepartment : '--' }}</p>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="策划组长">
                <a-auto-complete
                  disabled
                  style="width: 100%"
                  placeholder="请选择策划组长"
                  option-label-prop="title"
                  @search="onSearch1"
                  @select="onZuZhangSelect"
                  @blur="onZuZhangBlur"
                  v-decorator="['engineerManagerName']"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in dataSource1" :key="item.id" :title="item.name">
                      <p>{{ item.name }}<span v-if="item.fullName">（{{ item.fullName }}）</span></p>
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
        <tab-content title="孵化信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <a-form-item
                label="短视频拍摄">
                <a-auto-complete
                  style="width: 100%"
                  placeholder="请选择短视频拍摄"
                  option-label-prop="title"
                  @search="onSearch2"
                  @select="onPaiSheSelect"
                  @blur="onPaiSheBlur"
                  v-decorator="['shootName']"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in dataSource2" :key="item.id" :title="item.name">
                      <p>{{ item.name }}<span v-if="item.fullName">（{{ item.fullName }}）</span></p>
                    </a-select-option>
                  </template>
                  <a-input class="auto-input">
                    <a-icon slot="suffix" type="search" />
                  </a-input>
                </a-auto-complete>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                v-if="!signModel.operationStartDate"
                label="短视频接手时间">
                <a-date-picker
                  style="width: 100%"
                  placeholder="请选择日期"
                  value-format="YYYY-MM-DD"
                  v-decorator="['operationStartDate']"
                />
              </a-form-item>
              <a-form-item
                v-if="signModel.operationStartDate"
                label="短视频接手时间">
                <p class="mb0">{{ signModel.operationStartDate }}</p>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="短视频后期">
                <a-auto-complete
                  style="width: 100%"
                  placeholder="请选择短视频后期"
                  option-label-prop="title"
                  @search="onSearch3"
                  @select="onHouQiSelect"
                  @blur="onHouQiBlur"
                  v-decorator="['edittingName']"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in dataSource3" :key="item.id" :title="item.name">
                      <p>{{ item.name }}<span v-if="item.fullName">（{{ item.fullName }}）</span></p>
                    </a-select-option>
                  </template>
                  <a-input class="auto-input">
                    <a-icon slot="suffix" type="search" />
                  </a-input>
                </a-auto-complete>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8">
              <a-form-item
                label="后期组长">
                <a-auto-complete
                  disabled
                  style="width: 100%"
                  placeholder="请选择后期组长"
                  option-label-prop="title"
                  @search="onSearch4"
                  @select="onHzSelect"
                  @blur="onHzBlur"
                  v-decorator="['edittingManagerName']"
                >
                  <template slot="dataSource">
                    <a-select-option v-for="item in dataSource4" :key="item.id" :title="item.name">
                      <p>{{ item.name }}<span v-if="item.fullName">（{{ item.fullName }}）</span></p>
                    </a-select-option>
                  </template>
                  <a-input class="auto-input">
                    <a-icon slot="suffix" type="search" />
                  </a-input>
                </a-auto-complete>
              </a-form-item>
              <!-- <div>
                <test v-model="testValue"/>
                <a-button @click="testMethod">测试</a-button>
              </div> -->
            </a-col>
          </a-row>
        </tab-content>
        <div class="btn-group">
          <a-button type="primary" @click="handleSubmit">保存</a-button>
        </div>
      </a-form>
    </div>
  </a-spin>
</template>

<script>
import { getMediaInfo, editMeDiatMessage, artistSearch } from '@/api/gold'
// import test from './test'
import TabContent from './TabContent'
import Description from './Description'
import { Mediafileds } from '../fileds'
import ATextarea from 'ant-design-vue/es/input/TextArea'
import pick from 'lodash.pick'

export default {
  name: 'Info',
  components: {
    TabContent,
    Description,
    ATextarea
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fileds: Mediafileds,
      signModel: {},
      form: this.$form.createForm(this),
      operationType: [
        { name: 'DK', value: 1 },
        { name: '建宁', value: 2 },
        { name: '其他', value: 3 }
      ],
      operationMethod: [
        { name: '线上', value: 1 },
        { name: '线下', value: 2 },
        { name: '其他', value: 3 }
      ],
      dataSource: [],
      dataSource1: [],
      dataSource2: [],
      dataSource3: [],
      dataSource4: [],
      loading: true,
      testValue: 'jack'
    }
  },
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    // 防止表单未注册
    this.fileds.forEach(item => {
      this.form.getFieldDecorator(item)
    })
    this.getSignInfoHandle()
  },
  methods: {
    testMethod () {
    },
    getSignInfoHandle () {
      getMediaInfo(this.id).then(res => {
        // videoCountOfMonth
        res.operationType = res.operationType ? res.operationType.code : undefined
        res.operationMethod = res.operationMethod ? res.operationMethod.code : undefined
        res.engineerEmployeeDepartment = res.engineerEmployeeDepartment ? res.engineerEmployeeDepartment : undefined
        this.signModel = res
        this.signModel && this.form.setFieldsValue(pick(this.signModel, this.fileds))
        this.loading = false
      })
    },
    handleSubmit () {
      setTimeout(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (this.signModel.engineerEmployeeId) {
              values.engineerEmployeeId = this.signModel.engineerEmployeeId
            }
            if (this.signModel.engineerManagerEmployeeId) {
              values.engineerManagerEmployeeId = this.signModel.engineerManagerEmployeeId
            }
            if (this.signModel.shootEmployeeId) {
              values.shootEmployeeId = this.signModel.shootEmployeeId
            }
            if (this.signModel.edittingEmployeeId) {
              values.edittingEmployeeId = this.signModel.edittingEmployeeId
            }
            if (this.signModel.edittingManagerEmployeeId) {
              values.edittingManagerEmployeeId = this.signModel.edittingManagerEmployeeId
            }
            if (values.engineerName && !values.engineerEmployeeId) {
              this.$message.error('短视频策划不存在')
              return
            }
            if (values.engineerManagerName && !values.engineerManagerEmployeeId) {
              this.$message.error('策划组长不存在')
              return
            }
            if (values.edittingName && !values.edittingEmployeeId) {
              this.$message.error('短视频后期不存在')
              return
            }
            if (values.shootName && !values.shootEmployeeId) {
              this.$message.error('拍摄人不存在')
              return
            }
            if (values.edittingManagerName && !values.edittingManagerEmployeeId) {
              this.$message.error('后期组长不存在')
              return
            }
            values.operationInitFans = values.operationInitFans || this.signModel.operationInitFans
            values.operationStartDate = values.operationStartDate || this.signModel.operationStartDate
            const params = {
              ...values,
              influencerId: this.signModel.influencerId,
              id: this.signModel.id ? this.signModel.id : undefined
            }
            editMeDiatMessage(params).then(res => {
              this.$notification['success']({
                message: '提示',
                description: '操作成功',
                duration: 2
              })
              this.$emit('changeEdit', 1)
            })
          }
        })
      })
    },
    alertError (text) {

    },
    cancelHandle () {
      this.$emit('editFinish')
    },
    onSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.signModel.engineerEmployeeId = ''
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 200)
    },
    onSearch1 (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.signModel.engineerManagerEmployeeId = ''
      this.timer = setTimeout(() => {
        this.dataSearchHandle1(query)
      }, 200)
    },
    onSearch2 (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.signModel.shootEmployeeId = ''
      this.timer = setTimeout(() => {
        this.dataSearchHandle2(query)
      }, 200)
    },
    onSearch3 (query) {
      if (query.trim() === '') return
      this.signModel.edittingEmployeeId = ''
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle3(query)
      }, 200)
    },
    onSearch4 (query) {
      if (query.trim() === '') return
      this.signModel.edittingManagerEmployeeId = ''
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle4(query)
      }, 200)
    },
    filterData (val) {
      var data = ''
      data = this.dataSource.filter(item => item.id === val)[0] || this.dataSource.filter(item => item.name === val)[0]
      return data
    },
    filterData1 (val) {
      var data = ''
      data = this.dataSource1.filter(item => item.id === val)[0] || this.dataSource.filter(item => item.name === val)[0]
      return data
    },
    filterData2 (val) {
      var data = ''
      data = this.dataSource2.filter(item => item.id === val)[0] || this.dataSource.filter(item => item.name === val)[0]
      return data
    },
    filterData3 (val) {
      var data = ''
      data = this.dataSource3.filter(item => item.id === val)[0] || this.dataSource.filter(item => item.name === val)[0]
      return data
    },
    filterData4 (val) {
      var data = ''
      data = this.dataSource4.filter(item => item.id === val)[0] || this.dataSource.filter(item => item.name === val)[0]
      return data
    },
    dataSearchHandle (query, s) {
      artistSearch({ name: query, dutyType: 2 }).then(res => {
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    dataSearchHandle1 (query, s) {
      artistSearch({ name: query, dutyType: 2 }).then(res => {
        this.dataSource1 = []
        if (res.length > 0) {
          this.dataSource1 = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    dataSearchHandle2 (query, s) {
      artistSearch({ name: query, dutyType: 2 }).then(res => {
        this.dataSource2 = []
        if (res.length > 0) {
          this.dataSource2 = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    dataSearchHandle3 (query, s) {
      artistSearch({ name: query, dutyType: 2 }).then(res => {
        this.dataSource3 = []
        if (res.length > 0) {
          this.dataSource3 = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    dataSearchHandle4 (query, s) {
      artistSearch({ name: query, dutyType: 2 }).then(res => {
        this.dataSource4 = []
        if (res.length > 0) {
          this.dataSource4 = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    onCeHuaSelect (value, option) {
      const data = this.filterData(option.key)
      this.setCeHuaData(data)
    },
    setCeHuaData (data) {
      if (!data && !this.signModel.engineerEmployeeId) {
        this.$message.error('短视频策划不存在')
        this.signModel.engineerEmployeeId = ''
        return
      }
      this.signModel.engineerEmployeeId = data.id
      this.signModel.engineerEmployeeDepartment = data.fullName
    },
    onCeHuaBlur (value) {
      if (!value) {
        return false
      }
      const data = this.filterData(value)
      this.setCeHuaData(data)
    },
    onZuZhangSelect (value, option) {
      const data = this.filterData1(option.key)
      this.setZuZhangData(data)
    },
    setZuZhangData (data) {
      if (!data && !this.signModel.engineerManagerEmployeeId) {
        this.$message.error('策划组长不存在')
        this.signModel.engineerManagerEmployeeId = ''
        return
      }
      this.signModel.engineerManagerEmployeeId = data.id
    },
    onZuZhangBlur (value) {
      if (!value) {
        return false
      }
      const data = this.filterData1(value)
      this.setZuZhangData(data)
    },
    onPaiSheSelect (value, option) {
      const data = this.filterData2(option.key)
      this.setPaiSheData(data)
    },
    setPaiSheData (data) {
      if (!data && !this.signModel.shootEmployeeId) {
        this.$message.error('短视频拍摄人不存在')
        this.signModel.shootEmployeeId = ''
        return
      }
      if (data) {
        this.signModel.shootEmployeeId = data.id
      }
    },
    onPaiSheBlur (value) {
      if (!value) {
        return false
      }
      const data = this.filterData2(value)
      this.setPaiSheData(data)
    },
    onHouQiSelect (value, option) {
      const data = this.filterData3(option.key)
      this.setHouQiData(data)
    },
    setHouQiData (data) {
      if (!data && !this.signModel.edittingEmployeeId) {
        this.$message.error('短视频后期不存在')
        this.signModel.edittingEmployeeId = ''
        return
      }
      if (data) {
       this.signModel.edittingEmployeeId = data.id
      }
    },
    onHouQiBlur (value) {
      if (!value) {
        return false
      }
      const data = this.filterData3(value)
      this.setHouQiData(data)
    },
    onHzSelect (value, option) {
      const data = this.filterData4(option.key)
      this.setHzData(data)
    },
    setHzData (data) {
      if (!data && !this.signModel.edittingManagerEmployeeId) {
        this.$message.error('后期组长不存在')
        this.signModel.edittingManagerEmployeeId = ''
        return
      }
      if (data) {
       this.signModel.edittingManagerEmployeeId = data.id
      }
    },
    onHzBlur (value) {
      if (!value) {
        return false
      }
      const data = this.filterData4(value)
      this.setHzData(data)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
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
    margin-bottom: 8px;
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
.mb0{
  margin-bottom: 0;
}
.ant-input-number{
  width: 100%;
}
</style>
