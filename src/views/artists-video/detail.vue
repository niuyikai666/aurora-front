<template>
  <div>
    <info v-if="!edit" @change="changeEdit"/>
    <edit v-if="edit" @change="changeEdit"/>
  </div>
</template>

<script>
import info from './detail/info'
import edit from './detail/edit'
export default {
  data () {
    return {
      edit: false
    }
  },

  components: {
    info,
    edit
  },

  mounted () {},

  methods: {
    changeEdit () {
      this.edit = !this.edit
      console.log(this.edit)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
