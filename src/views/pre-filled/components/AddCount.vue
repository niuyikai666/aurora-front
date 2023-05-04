<template>
  <a-modal :title="`修改主播信息`" @cancel="cancel" @ok="submit" :visible="visible">
    <a-form>
      <a-form-item label="抖音号">
        <a-input v-model="params.tiktokCode"/>
      </a-form-item>
      <a-form-item label="公会经纪人">
        <a-select
          show-search
          placeholder="请选择招公会经纪人"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="onAgentSearch"
          :value="params.agentName"
          v-model="params.agentName"
        >
          <a-select-option v-for="d in agentSource" :key="d.name">
            {{ d.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { agentSearch } from '@/api/gold'
import SearchSelect from './SearchSelect'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    influencer: {
      type: [Object, String],
      default: ''
    }
  },
  data () {
    return {
      title: '',
      code: '',
      params: {},
      timer: null,
      agentSource: []
    }
  },

  components: {
    SearchSelect
  },

  mounted () {
  },

  methods: {
    submit () {
      if (!this.params.tiktokCode) {
        this.$notification['error']({
          message: '错误',
          description: `请填写抖音号`,
          duration: 4
        })
        return
      }
      if (!this.params.agentName) {
        this.$notification['error']({
          message: '错误',
          description: `请填写公会经纪人`,
          duration: 4
        })
        return
      }
      this.$emit('submit', this.params)
    },
    onAgentSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.agentSearchHandle(query)
      }, 200)
    },
    agentSearchHandle (query) {
      agentSearch({ searchName: query }).then(res => {
        this.agentSource = res.map(item => ({
          name: item
        }))
      })
    },
    cancel () {
      this.params = {}
      this.$emit('cancel')
    }
  },
  watch: {
    visible: {
      handler (val) {
        this.params = { ...this.influencer }
      },
      immediate: true
    }
  }
}

</script>
<style lang='less' scoped>
@import '../index.less';
</style>
