<template>
  <div class="task-content">
    <div class="title-con">
      <span>{{ taskData.missionName }}</span>
      <span>还剩{{ taskData.surplusDays }}天</span>
    </div>
    <div class="con">
      <complete v-if="taskData.targetStatic.length > 0" v-for="(item, index) in taskData.targetStatic" :key="index" :staticData="item" :proIndex="index + 1" />
    </div>
  </div>
</template>

<script>
import Complete from './Complete.vue'
export default {
  components: {
    Complete
  },
  name: 'Task',
  props: {
    taskData: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
  .title-con {
    color: #262626;
    span {
      &:first-child {
        font-weight: 500;
        margin-right: 16px;
      }
    }
  }
</style>
