<template>
  <div class="box">
    <a-icon v-if="!disable" class="icon-del" type="close-circle" @click="deleteHandle" />
    <a-row :gutter="24">
      <a-col :md="8">
        <a-form-item
          label="保底类型">
          <a-select
            v-if="!disable"
            v-model="data.type"
            placeholder="请选择"
          >
            <a-select-option :value="1">
              金额保底
            </a-select-option>
            <a-select-option :value="2">
              粉丝保底
            </a-select-option>
            <a-select-option :value="3">
              其他类保底
            </a-select-option>
          </a-select>
          <p v-if="disable">{{ type[data.type] }}</p>
        </a-form-item>
      </a-col>
      <a-col :md="8">
        <a-form-item
          label="保底数字">
          <a-input
            v-if="!disable"
            placeholder="请输入"
            v-model="data.minNum"
            @input="data.minNum = inputNumberHandle($event)"
          />
          <p v-if="disable">{{ data.minNum }}</p>
        </a-form-item>
      </a-col>
      <a-col :md="8">
        <a-form-item
          label="保底时间类型">
          <a-select
            v-if="!disable"
            v-model="data.dateType"
            @change="timeChangeHandle"
            placeholder="请选择"
          >
            <a-select-option :value="1">
              文本
            </a-select-option>
            <a-select-option :value="2">
              日期
            </a-select-option>
          </a-select>
          <p v-if="disable">{{ data.dateType === 1 ? '文本' : '日期' }}</p>
        </a-form-item>
      </a-col>
      <template v-if="data.dateType === 1">
        <a-col :md="8">
          <a-form-item
            label="保底起始时间">
            <a-input v-if="!disable" placeholder="请输入" :disabled="disable" v-model="data.startDate"/>
            <p v-if="disable">{{ data.startDate }}</p>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="保底结束时间">
            <a-input v-if="!disable" placeholder="请输入" :disabled="disable" v-model="data.endDate"/>
            <p v-if="disable">{{ data.endDate }}</p>
          </a-form-item>
        </a-col>
      </template>
      <template v-if="data.dateType === 2">
        <a-col :md="8">
          <a-form-item
            label="保底起始时间">
            <a-date-picker
              v-if="!disable"
              value-format="YYYY-MM-DD"
              v-model="data.startDate"
              :disabled="disable"
            />
            <p v-if="disable">{{ data.startDate }}</p>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="保底结束时间">
            <a-date-picker
              v-if="!disable"
              value-format="YYYY-MM-DD"
              v-model="data.endDate"
              :disabled="disable"
            />
            <p v-if="disable">{{ data.endDate }}</p>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Teed',
  props: {
    data: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: -1
    },
    disable: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      type: {
        1: '金额保底',
        2: '粉丝保底',
        3: '其他类保底'
      }
    }
  },
  async mounted () {
  },
  methods: {
    timeChangeHandle () {
      this.data.startDate = this.data.endDate = ''
    },
    deleteHandle () {
      this.$emit('delete', this.index)
    },
    inputNumberHandle (e) {
      return e.target.value.replace(/\D+/g, '')
    }
  }
}
</script>

<style lang="less" scoped>
  .box {
    position: relative;
    border: dashed 1px #eee;
    padding: 24px;
    margin-bottom: 24px;
    &:hover {
      .icon-del {
        opacity: 1;
      }
    }
    .icon-del {
      position: absolute;
      right: 12px;
      top: 12px;
      font-size: 20px;
      transition: opacity .3s ease;
      opacity: 0;
      cursor: pointer;
      z-index: 10;
    }
  }
</style>
