<template>
  <chart-card
    :total="amountFormatFunc1(newData)"
    :suffix="suffix"
  >
    <template slot="title">
      {{ title }} <doubt v-if="text">{{ text }}</doubt>
    </template>
    <template slot="footer" v-if="lastData">
      <div v-if="oldData !== 0 && oldData !== null && newData">
        <trend :flag="newData - oldData >= 0 ? 'up' : 'down'">
          <span slot="term">上一周期 {{ amountFormatFunc1(oldData, false) }}</span>
          <span class="trend">{{ caculatePersent(newData, oldData) }}</span>
        </trend>
      </div>
      <div v-else>
        <span>上一周期 {{ amountFormatFunc(oldData) }} <b style="margin-left:5px;font-weight:normal;">-</b></span>
      </div>
    </template>
  </chart-card>
</template>

<script>
import { amountFormatFunc, amountFormatFunc1 } from '@/utils/util'
import {
  ChartCard,
  Trend
} from '@/components'
export default {
  props: {
    newData: {
      type: [Number, Object],
      default: null
    },
    oldData: {
      type: [Number, Object, String],
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    lastData: {
      type: Object,
      default: null
    }
  },
  components: {
    ChartCard,
    Trend
  },
  data () {
    return {
      amountFormatFunc,
      amountFormatFunc1
    }
  },
  mounted () {
  },
  methods: {
    caculatePersent (newData, oldData) {
      const persent = Math.abs((((newData - oldData) / oldData) * 100).toFixed(2))
      return persent + '%'
    }
  },
  watch: {
    last (newVlaue) {
    }
  }
}
</script>

<style lang="less" scoped>
</style>
