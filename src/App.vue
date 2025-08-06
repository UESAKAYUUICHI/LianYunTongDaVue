<template>
  <el-container class="app-container">
    <el-header class="el-header">
      <IndexHeader />
    </el-header>
    <el-main :style="{ overflow: isProductService ? 'auto' : 'hidden' }">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="js" setup>
import IndexHeader from './components/indexHeader.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'

// 创建响应式变量跟踪是否为产品服务页面
const isProductService = ref(false)
const route = useRoute()

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    // 匹配路径是否为产品服务页面
    isProductService.value = newPath === '/productService'
    // 同时控制body滚动
    document.body.style.overflow = isProductService.value ? 'auto' : 'hidden'
  },
  { immediate: true },
)
</script>
<style scoped>
.app-container {
  height: 120vh;
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
  /* overflow: hidden; */
}
</style>
