<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      title="已评分"
      :bordered="false"
    >
      <div slot="extra" style="display:flex">
        <a-input-search v-model="nickname" placeholder="请输入主播昵称" style="width: 200px;margin-left:24px" @search="onSearch" />
      </div>
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getData"
        :scroll="{x: 1900}"
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
        <template slot="suggestions" slot-scope="text, record">
          <span v-if="record.suggestionList.length === 0">无</span>
          <ellipsis v-if="record.suggestionList.length > 0" :length="40" tooltip>{{ record.suggestionList.join('/') }}</ellipsis>
        </template>
        <template slot="state" slot-scope="text, record">
          <span>{{ text && text.msg }}</span>
          <svg-icon @click="handleLog(record.id)" class="icon" icon-class="time" style="margin-left:5px;cursor:pointer;"/>
        </template>
        <!-- <template slot="appealable" slot-scope="text, record">
          <a-button
            type="link"
            class="action-btn"
            v-if="text && record.state.code === 3"
            @click="grade(record.id)"
          >申诉</a-button>
        </template> -->
      </s-table>
    </a-card>
    <check-record
      :visible="visibleLog"
      :id="recordId"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { artistScoredColumns } from '../tableColumns'
import { getEmployeeScoredList } from '@/api/score'
import CheckRecord from '../components/CheckRecord'

export default {
  components: {
    STable,
    Ellipsis,
    CheckRecord
  },
  data () {
    return {
      columns: artistScoredColumns,
      visible: false,
      nickname: '',
      form: '',
      actorCategory: false,
      scorePlatform: false,
      visibleLog: false,
      loading: false,

      recordId: null
    }
  },
  mounted () {
  },
  methods: {
    onSearch () {
      this.$refs.table.refresh(true)
    },
    getData (parameter) {
      Object.assign(parameter, { nickname: this.nickname })
      return getEmployeeScoredList(parameter).then(res => {
        return res
      })
    },
    handleLog (id) {
      this.recordId = id
      this.visibleLog = true
    },
    grade (id) {
      this.$router.push({
        path: '/score/base/grade',
        query: {
          scoreId: id
        }
      })
    },
    handleCancel () {
      this.visibleLog = false
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
