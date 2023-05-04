<template>
  <a-modal
    class="modal"
    title="历史关系"
    :width="504"
    :visible="visible"
    :footer="false"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <!-- <a-button key="cancel" @click="cancelHandle">取 消</a-button> -->
      <!-- <a-button key="create" type="primary" @click="cancelHandle">关闭</a-button> -->
    </template>
    <a-list
      item-layout="horizontal"
      :data-source="dataSource"
      :pagination="dataSource.length >0 ? pagination : null"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <h4 slot="title">{{ item.operatorName }}</h4>
          <div slot="description">
            <div class="cription">
              将 {{ item.detail }}
            </div>
          </div>
        </a-list-item-meta>
        <div class="time">{{ item.time }}</div>
      </a-list-item>
    </a-list>
  </a-modal>
</template>

<script>
import { getOperateRelationHistory } from '@/api/artists'

export default {
  name: 'RelationHistoryDialog',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      pagination: {
        pageSize: 5
      },
      dataSource: []
    }
  },
  mounted () {
  },
  methods: {
    getOperateRelationHistoryHandle () {
      getOperateRelationHistory(this.id).then(res => {
        this.dataSource = res
      })
    }
  },
  watch: {
    id (val) {
      if (val) {
        this.getOperateRelationHistoryHandle()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .cription {
    color: #000;
    font-weight: 500;
    span {
      color: #755DD7;
    }
  }
  .ant-list {
    .ant-list-item {
      padding: 20px 0;
    }
  }
  .modal {
    /deep/ .ant-modal {
      .ant-modal-body {
        padding-top: 5px;
      }
    }
  }
  .time {
    position: relative;
    color: #8C8C8C;
    top: -15px;
  }
</style>
