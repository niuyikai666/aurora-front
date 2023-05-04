<template>
  <div>
    主播列表筛选:
    <a-select style="width: 170px; margin-left:5px;" v-model="statuVal" placeholder="请选择过滤条件" @change="handleChange">
      <a-select-option value="null">
        全部
      </a-select-option>
      <a-select-option v-for="(value, key) in statuArr" :key="key" :value="key">
        {{ value }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>

const st1 = {
  0: '基线任务未完成',
  1: '基线任务已完成',
  2: '未完成第一档',
  3: '未完成最高档'
}

const st2 = {
  1: '完成任务',
  0: '未完成任务'
}

const st3 = {
  1: '完成第一档过程任务',
  2: '完成第二档过程任务',
  3: '视频多人总流水>0',
  0: '未完成第一档过程任务'
}

const status = {
  'base': st1,
  'base-video': st1,
  'outer': st2,
  'video': st3,
  'vertical': st2,
  'exchange': st2
}

export default {
  name: 'MonthPick',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      statuArr: {},
      statuVal: undefined
    }
  },
  mounted () {
    this.statuArr = status[this.type]
  },
  methods: {
    handleChange (key) {
      this.$emit('change', key)
    }
  },
  watch: {
    type (val) {
      this.statuVal = undefined
      this.statuArr = status[val]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
