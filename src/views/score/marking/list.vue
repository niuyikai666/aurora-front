<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      title="评委打分"
      :bordered="false"
    >
      <div slot="extra" style="display:flex">
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
        <template slot="action" slot-scope="text, record">
          <!-- <a-popconfirm overlayClassName="popoer-del" title="确定删除该评委？" ok-text="确定" cancel-text="取消" @confirm="delHandle(record)">
            <a-button type="link">删除</a-button>
          </a-popconfirm> -->
          <a-button
            type="link"
            class="action-btn"
            @click="grade(record)">评分</a-button>
        </template>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { markingColumns } from '../tableColumns'
import { getMarkingList } from '@/api/score'
export default {
  components: {
    STable
  },
  data () {
    return {
      columns: markingColumns,
      queryParams: {
        platformType: ''
      },
      platformList: [
        { id: '', name: '全部' },
        { id: 1, name: '抖音' },
        { id: 2, name: '视频号' }
      ]
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const params = Object.assign({}, parameter, this.queryParams)
      return getMarkingList(params).then(res => {
        return res
      })
    },
    onSearch () {
      this.$refs.table.refresh(true)
    },
    grade (data) {
      this.$router.push({
        path: '/score/marking/detail',
        query: {
          id: data.id,
          type: data.actorCategory.code
        }
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
