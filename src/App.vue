<template>
  <el-container class="app-container">
    <el-header class="el-header">
      <IndexHeader />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="js" setup>
import IndexHeader from './components/indexHeader.vue'
</script>
<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
:deep(.el-header) {
  padding: 0px;
  height: 60px;
}
:deep(.el-main) {
  padding: 0px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
