<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input
          v-model="searchRecordId"
          placeholder="运输记录ID精确查询（如T001）"
          class="search-input"
        />
        <el-input
          v-model="searchVehicleId"
          placeholder="车辆ID精确查询（如V001）"
          class="search-input"
        />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增运输记录</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="运输记录ID" prop="record_id" align="center" />
      <el-table-column label="车辆ID" prop="vehicle_id" align="center" />
      <el-table-column label="物流ID" prop="logistics_id" align="center" />
      <el-table-column label="出发时间" prop="start_time" align="center" />
      <el-table-column label="到达时间" prop="end_time" align="center" />
      <el-table-column label="出发地" prop="start_location" align="center" />
      <el-table-column label="目的地" prop="end_location" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #default="scope">
          <el-button
            size="small"
            round
            class="edit-btn"
            @click="handleEdit(scope.$index, scope.row)"
          >
            <i class="el-icon-edit"></i> 编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            round
            class="delete-btn"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <i class="el-icon-delete"></i> 删除
          </el-button>
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
const searchRecordId = ref('')
const searchVehicleId = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份 - 车辆运输表结构
const originalTableData = [
  {
    record_id: 'T001',
    vehicle_id: 'V001',
    logistics_id: 'L001',
    start_time: '2023-11-01 09:30:00',
    end_time: '2023-11-02 14:15:00',
    start_location: '上海市浦东新区张江高科技园区博云路2号',
    end_location: '北京市海淀区中关村南大街5号',
    status: '已完成',
  },
  {
    record_id: 'T002',
    vehicle_id: 'V002',
    logistics_id: 'L002',
    start_time: '2023-11-03 10:00:00',
    end_time: null,
    start_location: '广州市天河区珠江新城冼村路5号',
    end_location: '深圳市福田区深南大道1000号',
    status: '在途',
  },
  {
    record_id: 'T003',
    vehicle_id: 'V003',
    logistics_id: 'L003',
    start_time: '2023-11-04 16:45:00',
    end_time: '2023-11-05 09:10:00',
    start_location: '成都市武侯区天府大道北段1700号',
    end_location: '重庆市渝中区解放碑邹容路68号',
    status: '已完成',
  },
  {
    record_id: 'T004',
    vehicle_id: 'V001',
    logistics_id: 'L004',
    start_time: '2023-11-05 11:20:00',
    end_time: null,
    start_location: '杭州市西湖区文三路90号',
    end_location: '南京市玄武区中山路18号',
    status: '在途',
  },
  {
    record_id: 'T005',
    vehicle_id: 'V004',
    logistics_id: 'L005',
    start_time: '2023-11-06 13:30:00',
    end_time: '2023-11-07 10:45:00',
    start_location: '武汉市洪山区珞喻路1037号',
    end_location: '长沙市岳麓区麓山南路932号',
    status: '已完成',
  },
]

// 状态标签类型映射
const getStatusTagType = (status) => {
  switch (status) {
    case '已完成':
      return 'success'
    case '在途':
      return 'primary'
    default:
      return ''
  }
}

// 分页相关变量
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

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

  // 运输记录ID精确查询
  if (searchRecordId.value) {
    data = data.filter((item) => item.record_id === searchRecordId.value)
  }

  // 车辆ID精确查询
  if (searchVehicleId.value) {
    data = data.filter((item) => item.vehicle_id === searchVehicleId.value)
  }

  // 更新过滤后的数据和总数，重置到第一页
  filteredData.value = data
  totalItems.value = data.length
  currentPage.value = 1
}

// 重置搜索条件
const handleReset = () => {
  searchRecordId.value = ''
  searchVehicleId.value = ''
  fetchData()
}

// 新增运输记录
const handleAdd = () => {
  alert('新增运输记录功能待实现')
}

// 编辑和删除方法
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 运输记录ID: ${row.record_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 运输记录ID: ${row.record_id}`)
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
