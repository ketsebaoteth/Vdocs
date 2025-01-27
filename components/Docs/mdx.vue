<template>
    <div v-html="renderedContent"></div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        required: true
      }
    },
    computed: {
      renderedContent() {
        return this.$md.render(this.content)
      }
    }
  }
  </script>
  