<template>
  <div class="dashboard-container">
    <basicRadarChart class="chart-item"></basicRadarChart>
    <eachDaySend class="chart-item"></eachDaySend>
  </div>
</template>

<script setup>
import basicRadarChart from '@/components/basicRadarChart.vue'
import eachDaySend from '@/components/eachDaySend.vue'
</script>

<style scoped lang="scss">
.dashboard-container {
  display: flex; /* 使用Flexbox布局 */
  gap: 20px; /* 图表之间的间距 */
  padding: 20px;
  height: 100%;
}

.chart-item {
  flex: 1; /* 两个图表平均分配宽度 */
  min-width: 0; /* 防止内容溢出 */
}
</style>
