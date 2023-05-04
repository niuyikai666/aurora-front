<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :sm="24" :md="16" :lg="17">
        <a-card :bordered="false" :loading="loading">
          <div slot="title">
            指标统计
          </div>
          <a-row type="flex" :justify="dutytype !== 2 ? 'space-between' : 'start'">
            <a-col :span="5" v-if="dutytype !== 2">
              <div class="static-con">
                <div class="icon icon1"></div>
                <div class="num">{{ amountFormat(targetData.totalReward) }}</div>
                <div class="exp">总流水</div>
              </div>
            </a-col>
            <a-col :span="dutytype !== 2 && 5 || 6">
              <div class="static-con">
                <div class="icon icon2"></div>
                <div class="num">{{ amountFormat(targetData.lastEnterNewActorCount) }}</div>
                <div class="exp">昨日新入驻主播人数</div>
              </div>
            </a-col>
            <a-col :span="dutytype !== 2 && 5 || 12">
              <div class="static-con">
                <div class="icon icon3"></div>
                <div class="num">{{ amountFormat(targetData.missionCount) }}</div>
                <div class="exp">任务数</div>
              </div>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" :loading="loading" class="mt24">
          <div slot="title">
            最近任务
          </div>
          <div v-if="taskData2.targetStatic">
            <task :taskData="taskData2" />
          </div>
          <div v-if="!taskData2.targetStatic">
            <a-empty :image="simpleImage" />
          </div>
        </a-card>
        <a-card :bordered="false" :loading="loading" class="mt24">
          <div slot="title">
            最新任务
          </div>
          <div v-if="taskData.targetStatic">
            <task :taskData="taskData" />
          </div>
          <div v-if="!taskData.targetStatic">
            <a-empty :image="simpleImage" />
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="8" :lg="7">
        <a-card :bordered="false" :loading="loading">
          <div slot="title">通知公告</div>
          <div class="notice-con">
            <p v-for="item in notice1" :key="item.id" :title="item.title" @click="detailHandle(item.id)">{{ item.title }}</p>
            <a-empty v-if="notice1.length <= 0" :image="simpleImage" />
          </div>
        </a-card>
        <a-card :bordered="false" :loading="loading" class="mt24">
          <div slot="title">任务公告</div>
          <div class="notice-con">
            <p v-for="item in notice2" :key="item.id" :title="item.title" @click="detailHandle(item.id)">{{ item.title }}</p>
            <a-empty v-if="notice2.length <= 0" :image="simpleImage" />
          </div>
        </a-card>
        <a-card :bordered="false" :loading="loading" class="mt24">
          <div slot="title">系统公告</div>
          <div class="notice-con">
            <p v-for="item in notice3" :key="item.id" :title="item.title" @click="detailHandle(item.id)">{{ item.title }}</p>
            <a-empty v-if="notice3.length <= 0" :image="simpleImage" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTarget, getTaskRecent, getTaskNew, getNoticeList } from '@/api/dashboard'
import { Ellipsis } from '@/components'
import Task from './components/Task'
import { amountFormat } from '@/utils/util'
import { Empty } from 'ant-design-vue'

export default {
  name: 'Dashboard',
  components: {
    Task,
    Ellipsis
  },
  data () {
    return {
      amountFormat,
      targetData: {},
      text: '清楚所有捣乱用户清楚所有捣乱用户清楚所有捣乱用户清楚所有捣乱用户',
      loading: true,
      taskData: [],
      taskData2: [],

      notice1: [],
      notice2: [],
      notice3: [],

      simpleImage: ''
    }
  },
  async mounted () {
    await this.getTargetHandle()
    await this.getTaskRecentHandle()
    await this.getTaskNewHandle()
    await this.getNoticeListHandle()
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
    this.$nextTick(() => {
      this.loading = false
    })
  },
  methods: {
    async getTargetHandle () {
      const target = await getTarget()
      this.targetData = target
    },

    async getTaskRecentHandle () {
      const data = await getTaskRecent()
      this.taskData = data
    },

    async getTaskNewHandle () {
      const data = await getTaskNew()
      this.taskData2 = data
    },

    async getNoticeListHandle () {
      const data = await getNoticeList()
      this.notice1 = data.filter(item => item.type.code === 1)
      this.notice2 = data.filter(item => item.type.code === 2)
      this.notice3 = data.filter(item => item.type.code === 3)
    },

    detailHandle (id) {
      this.$router.push({
        path: `/notice-detail?id=${id}`
      })
    }
  },
  computed: {
    ...mapGetters([
      'dutytype'
    ])
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
