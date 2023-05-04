<template>
  <a-tooltip placement="topRight">
    <template slot="title">
      <span>{{ content }}</span>
    </template>
    <a-icon style="position:relative; top:-10px;" type="question-circle" />
  </a-tooltip>
</template>

<script>

export default {
  name: 'TitleTip',
  props: {
    content: {
      type: String,
      default: null
    }
  }
}
</script>
