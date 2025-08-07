<template>
  <div id="main1" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main1'))
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '仓库每日总发货量统计',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {},
      },
    ],
  }
  myChart.setOption(option)
})
</script>
