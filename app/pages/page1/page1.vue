<template>
  <h1>page1</h1>
  <input v-model="content">
</template>

<script setup>
import { ref } from 'vue'
import utils from '$common/utils'
const content = ref('')
console.log(utils, '---utils')
console.log('page1 init------')
</script>

<style scoped lang="less">
  h1{
    color: red;
  }
</style>