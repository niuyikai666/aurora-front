<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      :bordered="false"
    >
      <div slot="title">
        优质主播审核列表
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
        <template slot="scorePlatform" slot-scope="text, record">
          <span>{{ record.scorePlatform && record.scorePlatform.msg || '-' }}</span>
        </template>
        <template slot="suggestions" slot-scope="text, record">
          <span v-if="!record.suggestions">无</span>
          <ellipsis v-if="record.suggestions" :length="40" tooltip>{{ record.suggestions }}</ellipsis>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-button
            type="link"
            class="action-btn"
            :disabled="record.state.code === 6"
            @click="checkHandle(record)">审核</a-button>
        </template>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { examineColumns } from '../tableColumns'
import { getExamineList, checkExamine } from '@/api/score'
export default {
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      columns: examineColumns,
      visible: false,
      form: '',
      actorCategory: false,
      scorePlatform: false,
      loading: false,
      platformList: [
        { id: '', name: '全部' },
        { id: 1, name: '抖音' },
        { id: 2, name: '视频号' }
      ],
      queryParams: {
        platformType: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    onSearch () {
      this.$refs.table.refresh(true)
    },
    getData (parameter) {
      const params = Object.assign({}, parameter, this.queryParams)
      return getExamineList(params).then(res => {
        return res
      })
    },
    checkHandle (record) {
      checkExamine({
        id: record.id
      }).then(() => {
        this.$router.push({
          path: '/score/examine/check',
          query: {
            id: record.id
          }
        })
      })
    }
  },
  filters: {
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
