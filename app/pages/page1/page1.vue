<template>
  <h1>page1</h1>
  <el-input
    v-model="content"
    style="width: 300px;"
  />
  <el-table
    :data="tableData"
    style="width: 100%;"
  >
    <el-table-column
      prop="name"
      label="Name"
      width="180"
    />
    <el-table-column
      prop="id"
      label="ID"
      width="180"
    />
    <el-table-column
      prop="description"
      label="description"
      width="180"
    />
  </el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import $curl from '$common/curl'
const content = ref('')
const tableData = ref([{
  name: 'John',
  age: 18,
  address: '123 Main St'
},{
  name: 'John',
  age: 18,
  address: '123 Main St'
}])
console.log('page1 init------')

onMounted(async () => {
  const { data } = await $curl({
    url: '/api/project/list',
    method: 'get',
    query: {
     project_key:1
    }
  })
  tableData.value = data
})
</script>

<style scoped lang="less">
  h1{
    color: red;
  }
</style>