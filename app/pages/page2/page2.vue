<template>
  <h1>page2</h1>
  <input v-model="content">
</template>

<script setup>
import { ref } from 'vue'
import utils from '$common/utils'
console.log(utils, '---utils---2222')
const content = ref('')
console.log('page2 init')
</script>

<style scoped lang="less">
  h1{
    color: blue;
  }
</style>