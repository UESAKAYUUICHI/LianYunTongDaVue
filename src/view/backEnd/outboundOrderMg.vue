<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input
          v-model="searchOutboundId"
          placeholder="出库单ID精确查询（如O001）"
          class="search-input"
        />
        <el-input
          v-model="searchWarehouseId"
          placeholder="仓库ID精确查询（如W001）"
          class="search-input"
        />
        <el-input
          v-model="searchOrderId"
          placeholder="订单ID精确查询（如OR001）"
          class="search-input"
        />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增出库单</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="出库单ID" prop="outbound_id" align="center" />
      <el-table-column label="仓库ID" prop="warehouse_id" align="center" />
      <el-table-column label="订单ID" prop="order_id" align="center" />
      <el-table-column label="出库时间" prop="outbound_time" align="center" />
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
const searchOutboundId = ref('')
const searchWarehouseId = ref('')
const searchOrderId = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份
const originalTableData = [
  {
    outbound_id: 'O001',
    warehouse_id: 'W001',
    order_id: 'OR001',
    outbound_time: '2023-11-01 09:30:00',
    status: '已审核',
  },
  {
    outbound_id: 'O002',
    warehouse_id: 'W001',
    order_id: 'OR002',
    outbound_time: '2023-11-01 10:15:00',
    status: '已出库',
  },
  {
    outbound_id: 'O003',
    warehouse_id: 'W002',
    order_id: 'OR003',
    outbound_time: '2023-11-02 14:20:00',
    status: '待审核',
  },
  {
    outbound_id: 'O004',
    warehouse_id: 'W003',
    order_id: 'OR004',
    outbound_time: '2023-11-03 16:45:00',
    status: '已出库',
  },
  {
    outbound_id: 'O005',
    warehouse_id: 'W002',
    order_id: 'OR005',
    outbound_time: '2023-11-04 09:10:00',
    status: '取消',
  },
]

// 分页相关变量
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

// 状态标签类型映射
const getStatusTagType = (status) => {
  switch (status) {
    case '待审核':
      return 'info'
    case '已审核':
      return 'primary'
    case '已出库':
      return 'success'
    case '取消':
      return 'danger'
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

  // 出库单ID精确查询
  if (searchOutboundId.value) {
    data = data.filter((item) => item.outbound_id === searchOutboundId.value)
  }

  // 仓库ID精确查询
  if (searchWarehouseId.value) {
    data = data.filter((item) => item.warehouse_id === searchWarehouseId.value)
  }

  // 订单ID精确查询
  if (searchOrderId.value) {
    data = data.filter((item) => item.order_id === searchOrderId.value)
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
  searchId.value = ''
  searchName.value = ''
  fetchData()
}

// 新增货物
const handleAdd = () => {
  alert('新增货物功能待实现')
}

// 编辑和删除方法
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 出库单ID: ${row.outbound_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 出库单ID: ${row.outbound_id}`)
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
  width: 220px; // 保持搜索框宽度一致
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
