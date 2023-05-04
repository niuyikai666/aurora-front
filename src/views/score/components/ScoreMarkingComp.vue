<template>
  <div class="item-flex">
    <a-select placeholder="请选择" v-model="scoreItem.id" style="width: 110px;" @select="selectHandle">
      <a-select-option v-for="(item, index) in scoreItem.list" :key="index" :value="item.id">
        {{ item.grade }}
      </a-select-option>
    </a-select>
    <a-input-number
      :disabled="min === 0 && max === 0"
      style="width: 110px;margin-left:10px;"
      placeholder="请输入分数"
      v-model="scoreItem.score"
      :min="min"
      :max="max"
    />
    <span style="margin-left:10px;">{{ crip }}</span>
  </div>
</template>

<script>
export default {
  name: 'ScoreMarkingComp',
  props: {
    scoreItem: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      min: null,
      max: null
    }
  },
  mounted () {
  },
  methods: {
    selectHandle (value) {
      const data = this.scoreItem.list.filter(item => item.id === value)[0]
      this.min = data.minScore
      this.max = data.maxScore
    }
  },
  computed: {
    crip () {
      if (this.min !== null && this.max !== null) {
        return `(${this.min} ~ ${this.max})`
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .item-flex {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
</style>
