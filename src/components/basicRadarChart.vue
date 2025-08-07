<template>
  <div id="main2" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main2'))
  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '仓库数据统计',
    },
    legend: {
      data: ['仓库评分', '仓库容量'],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '上海分仓库', max: 6500 },
        { name: '北京分仓库', max: 16000 },
        { name: '天津分仓库', max: 30000 },
        { name: '四川分仓库', max: 38000 },
        { name: '浙江分仓库', max: 52000 },
        { name: '广州分仓库', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '仓库评分',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '仓库容量',
          },
        ],
      },
    ],
  }
  myChart.setOption(option)
})
</script>
