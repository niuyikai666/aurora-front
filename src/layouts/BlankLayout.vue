<template>
  <div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'BlankLayout'
}
</script>

<style scoped>

</style>
