<template>
  <div class="tip">
    <span style="margin-right:50px">
      主播列表更新时间：{{ updateTime.actorInfoTime && updateTime.actorInfoTime.length > 0 ? updateTime.actorInfoTime[0] : '-' }}
      <!-- <a-button
        v-if="updateTime.actorInfoTime && updateTime.actorInfoTime.length > 0 && permission.includes('actor_list_change_log')"
        type="link"
        @click="recordHandle"
        style="margin-left: 10px;"
      >更新记录</a-button> -->
    </span>
    <span>直播信息更新时间：{{ updateTime.liveTime ? updateTime.liveTime : '-' }}</span>
    <div class="tip-item">
      <!-- <span>退会信息更新时间：{{ updateTime.retiredTime ? updateTime.retiredTime : '-' }}</span> -->
    </div>
    <a-modal
      v-model="visible"
      title="更新记录"
      :footer="null"
      width="340px"
    >
      <ul class="record-list">
        <li v-for="(item, idx) in updateTime.actorInfoTime" :key="idx">{{ item }}</li>
      </ul>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'TopTip',
  props: {
    updateTime: {
      type: Object,
      default: null
    },
    permission: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    // console.log(this.updateTime)
  },
  methods: {
    recordHandle () {
      this.visible = true
    }
  }
}
</script>
