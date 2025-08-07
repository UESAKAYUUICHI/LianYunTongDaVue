<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input
          v-model="searchInventoryId"
          placeholder="库存ID精确查询（如I001）"
          class="search-input"
        />
        <el-input
          v-model="searchWarehouseId"
          placeholder="仓库ID精确查询（如W001）"
          class="search-input"
        />
        <el-input v-model="searchGoodsId" placeholder="货物ID模糊查询" class="search-input" />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增库存</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="库存ID" prop="inventory_id" align="center" />
      <el-table-column label="仓库ID" prop="warehouse_id" align="center" />
      <el-table-column label="货物ID" prop="goods_id" align="center" />
      <el-table-column label="数量" prop="quantity" align="center" />
      <el-table-column label="库位" prop="storage_location" align="center" />
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
const searchInventoryId = ref('')
const searchWarehouseId = ref('')
const searchGoodsId = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份
const originalTableData = [
  {
    inventory_id: 'I001',
    warehouse_id: 'W001',
    goods_id: 'G001',
    quantity: 50,
    storage_location: 'A区-1货架-3层',
  },
  {
    inventory_id: 'I002',
    warehouse_id: 'W001',
    goods_id: 'G002',
    quantity: 120,
    storage_location: 'A区-2货架-1层',
  },
  {
    inventory_id: 'I003',
    warehouse_id: 'W002',
    goods_id: 'G003',
    quantity: 30,
    storage_location: 'B区-3货架-2层',
  },
  {
    inventory_id: 'I004',
    warehouse_id: 'W003',
    goods_id: 'G001',
    quantity: 75,
    storage_location: 'C区-1货架-4层',
  },
  {
    inventory_id: 'I005',
    warehouse_id: 'W001',
    goods_id: 'G004',
    quantity: 200,
    storage_location: 'A区-3货架-2层',
  },
  {
    inventory_id: 'I006',
    warehouse_id: 'W002',
    goods_id: 'G005',
    quantity: 45,
    storage_location: 'B区-2货架-5层',
  },
  {
    inventory_id: 'I007',
    warehouse_id: 'W003',
    goods_id: 'G006',
    quantity: 15,
    storage_location: 'C区-4货架-1层',
  },
  {
    inventory_id: 'I008',
    warehouse_id: 'W001',
    goods_id: 'G007',
    quantity: 90,
    storage_location: 'A区-5货架-3层',
  },
  {
    inventory_id: 'I009',
    warehouse_id: 'W002',
    goods_id: 'G008',
    quantity: 60,
    storage_location: 'B区-1货架-2层',
  },
  {
    inventory_id: 'I010',
    warehouse_id: 'W003',
    goods_id: 'G009',
    quantity: 25,
    storage_location: 'C区-2货架-4层',
  },
  {
    inventory_id: 'I011',
    warehouse_id: 'W001',
    goods_id: 'G010',
    quantity: 80,
    storage_location: 'A区-2货架-5层',
  },
  {
    inventory_id: 'I012',
    warehouse_id: 'W002',
    goods_id: 'G011',
    quantity: 40,
    storage_location: 'B区-4货架-3层',
  },
  {
    inventory_id: 'I013',
    warehouse_id: 'W003',
    goods_id: 'G012',
    quantity: 110,
    storage_location: 'C区-3货架-1层',
  },
  {
    inventory_id: 'I014',
    warehouse_id: 'W001',
    goods_id: 'G013',
    quantity: 35,
    storage_location: 'A区-4货架-2层',
  },
  {
    inventory_id: 'I015',
    warehouse_id: 'W002',
    goods_id: 'G014',
    quantity: 55,
    storage_location: 'B区-5货架-4层',
  },
]

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

  // 库存ID精确查询
  if (searchInventoryId.value) {
    data = data.filter((item) => item.inventory_id === searchInventoryId.value)
  }

  // 仓库ID精确查询
  if (searchWarehouseId.value) {
    data = data.filter((item) => item.warehouse_id === searchWarehouseId.value)
  }

  // 货物ID模糊查询
  if (searchGoodsId.value) {
    const keyword = searchGoodsId.value.toLowerCase()
    data = data.filter((item) => item.goods_id.toLowerCase().includes(keyword))
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
  searchInventoryId.value = ''
  searchWarehouseId.value = ''
  searchGoodsId.value = ''
  fetchData()
}

// 新增库存
const handleAdd = () => {
  alert('新增库存功能待实现')
}

// 编辑和删除方法
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 库存ID: ${row.inventory_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 库存ID: ${row.inventory_id}`)
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
