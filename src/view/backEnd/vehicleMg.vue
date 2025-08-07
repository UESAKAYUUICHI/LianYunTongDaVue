<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input
          v-model="searchVehicleId"
          placeholder="车辆ID精确查询（如V001）"
          class="search-input"
        />
        <el-input v-model="searchLicensePlate" placeholder="车牌号模糊查询" class="search-input" />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增车辆</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="车辆ID" prop="vehicle_id" align="center" />
      <el-table-column label="车牌号" prop="license_plate" align="center" />
      <el-table-column label="车辆类型" prop="vehicle_type" align="center" />
      <el-table-column label="最大载重(kg)" prop="load_weight" align="center" />
      <el-table-column label="最大容积(m³)" prop="load_volume" align="center" />
      <el-table-column label="司机ID" prop="driver_id" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- :page-sizes="[5, 10,20,50]" -->
    <!-- 分页控件 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[15]"
        :total="totalItems"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 搜索条件
const searchVehicleId = ref('')
const searchLicensePlate = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份
const originalTableData = [
  {
    vehicle_id: 'V001',
    license_plate: '京A12345',
    vehicle_type: '厢式货车',
    load_weight: 5000.0,
    load_volume: 20.0,
    driver_id: 'D001',
    status: '正常',
  },
  {
    vehicle_id: 'V002',
    license_plate: '沪B67890',
    vehicle_type: '冷藏车',
    load_weight: 8000.0,
    load_volume: 30.0,
    driver_id: 'D002',
    status: '维修',
  },
  {
    vehicle_id: 'V003',
    license_plate: '粤C13579',
    vehicle_type: '平板车',
    load_weight: 10000.0,
    load_volume: 40.0,
    driver_id: 'D003',
    status: '停用',
  },
  {
    vehicle_id: 'V004',
    license_plate: '苏D24680',
    vehicle_type: '厢式货车',
    load_weight: 5000.0,
    load_volume: 25.0,
    driver_id: 'D004',
    status: '在途',
  },
  {
    vehicle_id: 'V005',
    license_plate: '浙E97531',
    vehicle_type: '冷藏车',
    load_weight: 6000.0,
    load_volume: 22.0,
    driver_id: 'D005',
    status: '正常',
  },
]

// 分页相关变量
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

// 状态标签类型映射
const getStatusTagType = (status) => {
  switch (status) {
    case '正常':
      return 'success'
    case '维修':
      return 'warning'
    case '停用':
      return 'danger'
    case '在途':
      return 'info'
    default:
      return ''
  }
}

// 计算属性：分页后的数据
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(startIndex, startIndex + pageSize.value)
})

// 初始化加载数据
onMounted(() => {
  fetchData()
})

// 获取并过滤数据
const fetchData = () => {
  let data = [...originalTableData]

  // 车辆ID精确查询
  if (searchVehicleId.value) {
    data = data.filter((item) => item.vehicle_id === searchVehicleId.value)
  }

  // 车牌号模糊查询
  if (searchLicensePlate.value) {
    const keyword = searchLicensePlate.value.toLowerCase()
    data = data.filter((item) => item.license_plate.toLowerCase().includes(keyword))
  }

  // 更新过滤后的数据和总数，重置到第一页
  filteredData.value = data
  totalItems.value = data.length
  currentPage.value = 1
}

// 分页事件处理
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1 // 页码重置为1
}

const handleCurrentChange = (page) => {
  currentPage.value = page
}

// 重置搜索条件
const handleReset = () => {
  searchVehicleId.value = ''
  searchLicensePlate.value = ''
  fetchData()
}

// 新增车辆
const handleAdd = () => {
  alert('新增车辆功能待实现')
}

// 编辑和删除方法
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 车辆ID: ${row.vehicle_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 车辆ID: ${row.vehicle_id}`)
}
</script>

<style scoped lang="scss">
// 搜索区域样式优化
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #fafbfc;
  border-radius: 8px;
}

.search-group {
  display: flex;
  gap: 16px;
}

.search-input {
  width: 220px;
  margin-bottom: 0;

  ::v-deep .el-input__inner {
    height: 40px;
  }
}

.button-group {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 8px 20px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

// 调整表格容器内边距
.table-container {
  padding: 24px;
  padding-bottom: 80px; /* 为分页条留出空间 */
  position: relative; /* 相对定位，作为分页条的定位基准 */
  min-height: 400px; /* 确保容器有足够高度 */
  :deep(el-table-column) {
    align-items: center;
    justify-content: center;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px; /* 增加内边距 */
  position: absolute; /* 绝对定位 */
  bottom: 0; /* 固定到底部 */
  right: 0;
  left: 0;
  background-color: #fff; /* 白色背景 */
  border-top: 1px solid #e5e7eb; /* 顶部边框 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03); /* 顶部阴影效果 */
}

// 响应式调整
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 16px;
  }

  .search-group,
  .button-group {
    width: 100%;
    justify-content: center;
  }

  .search-input {
    width: 100%;
  }
}

// 分页容器样式
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding: 10px;
}
</style>
