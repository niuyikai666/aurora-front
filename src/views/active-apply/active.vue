<template>
  <div class="container">
    <div class="search-content">
      <div class="result-con">
        <ul>
          <li>
            <span class="item">昵称：{{ info.nickName }}</span>
            <span class="item">抖音号：{{ info.tikTokCode }}</span>
            <span class="item">抖音号(原): {{ info.tikTokCodeOrig }}</span>
            <span class="item">火山号: {{ info.volcanoCode }}</span>
          </li>
        </ul>
      </div>
      <div class="form-content">
        <div class="form-title">断播主播激活申请</div>
        <a-form
          class="form"
          :form="form"
          layout="inline"
        >
          <a-form-item class="form-item" label="激活时间">
            <a-date-picker
              style="width:220px;"
              v-decorator="['activityDate', { rules: [{ required: true, message: '激活时间不能为空' }] }]"
              value-format="YYYY-MM-DD"
              :disabledDate="disabledDate"
            />
          </a-form-item>
          <br />
          <a-form-item class="form-item" label="激活招募">
            <a-auto-complete
              style="width: 220px"
              v-decorator="['zm', { rules: [{ required: true, message: '激活招募不能为空' }] }]"
              placeholder="请搜索账号"
              option-label-prop="title"
              @search="onSearch"
              @select="onSelect"
            >
              <template slot="dataSource">
                <a-select-option v-for="item in dataSource" :key="item.id" :title="item.name">
                  <span>{{ item.name }}</span>
                </a-select-option>
              </template>
              <a-input>
                <a-icon slot="suffix" type="search" />
              </a-input>
            </a-auto-complete>
          </a-form-item>
          <br />
          <a-form-item class="form-item" label="激活运营">
            <a-auto-complete
              style="width: 220px"
              placeholder="请搜索账号"
              v-decorator="['yy', { rules: [{ required: true, message: '激活运营不能为空' }] }]"
              option-label-prop="title"
              @search="onSearch2"
              @select="onSelect2"
            >
              <template slot="dataSource">
                <a-select-option v-for="item in dataSource2" :key="item.id" :title="item.name">
                  <span>{{ item.name }}</span>
                </a-select-option>
              </template>
              <a-input>
                <a-icon slot="suffix" type="search" />
              </a-input>
            </a-auto-complete>
          </a-form-item>
          <br />
          <a-form-item class="form-item">
            <a-button type="primary" style="margin-left:10px" @click="submitHandle">提 交</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { employeeSearch } from '@/api/personnel'
import { cutoffArtistsApply } from '@/api/artists'
import moment from 'moment'

export default {
  name: 'ArtistSearch',
  data () {
    return {
      form: this.$form.createForm(this),
      info: [],

      employeeId: '',
      dataSource: [],

      employeeId2: '',
      dataSource2: []
    }
  },
  mounted () {
    this.info = JSON.parse(this.$route.query.info)
    // console.log(this.info)
  },
  methods: {

    disabledDate (current) {
      return current > moment().subtract(0, 'days')
    },

    submitHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('form-values', values)
          // console.log('form-values1', this.info.id)
          // console.log('form-value2', this.employeeId)
          // console.log('form-value3', this.employeeId2)
          this.createHandle({
            activityDate: values.activityDate,
            operatorEmployeeId: this.employeeId2,
            recruitEmployeeId: this.employeeId,
            tiktokLiveInfoId: this.info.id
          })
        }
      })
    },

    createHandle (data) {
      cutoffArtistsApply(data).then(() => {
        this.$message.success('提交成功！')
        setTimeout(() => {
          this.$router.push({
            path: '/artists-operation/gold-data/workplace'
          })
        }, 500)
      })
    },

    onSelect (value, option) {
      const data = this.dataSource.filter(item => item.id === option.key)[0]
      this.employeeId = data.id
    },
    onSearch (query) {
      this.employeeId = ''
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 200)
    },
    dataSearchHandle (query) {
      employeeSearch({ searchName: query }).then(res => {
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            item.name = `${item.name}(${item.departmentInfo.fullName})`
            return item
          })
        }
      })
    },

    onSelect2 (value, option) {
      const data = this.dataSource2.filter(item => item.id === option.key)[0]
      this.employeeId2 = data.id
    },
    onSearch2 (query) {
      this.employeeId2 = ''
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle2(query)
      }, 200)
    },
    dataSearchHandle2 (query) {
      employeeSearch({ searchName: query }).then(res => {
        this.dataSource2 = []
        if (res.length > 0) {
          this.dataSource2 = res.map(item => {
            item.id = item.id + ''
            item.name = `${item.name}(${item.departmentInfo.fullName})`
            return item
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 88vh;
  background-color: #fff;
  .result-con {
    border-bottom: solid 24px #f0f2f5;
    ul {
      margin: 0;
      padding: 0 0 0 40px;
      li {
        display: flex;
        padding: 40px 0;
        align-items: center;
        .item {
          display: inline-block;
          font-size: 14px;
          margin-right: 60px;
        }
      }
    }
  }
  .form-content {
    padding: 32px 0 0 40px;
    .form-title {
      font-size: 20px;
      font-weight: 700;
      color: rgba(0,0,0,.85);
    }
    .form-item {
      margin-top: 20px;
    }
    /deep/ .ant-form-item-label > label {
      width: 81px;
      display: inline-block;
    }
    /deep/ .ant-form-inline .ant-form-item-with-help {
      margin-bottom: 0;
    }
  }
}
</style>
