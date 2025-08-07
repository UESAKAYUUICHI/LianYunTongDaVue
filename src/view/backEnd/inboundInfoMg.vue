<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input
          v-model="searchItemId"
          placeholder="入库明细ID精确查询（如II001）"
          class="search-input"
        />
        <el-input
          v-model="searchInboundId"
          placeholder="入库单ID精确查询（如I001）"
          class="search-input"
        />
        <el-input v-model="searchGoodsId" placeholder="货物ID模糊查询" class="search-input" />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增入库明细</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="入库明细ID" prop="inbound_item_id" align="center" />
      <el-table-column label="入库单ID" prop="inbound_id" align="center" />
      <el-table-column label="货物ID" prop="goods_id" align="center" />
      <el-table-column label="数量" prop="quantity" align="center" />
      <el-table-column label="成本价" prop="unit_cost" align="center" />
      <el-table-column label="小计" prop="subtotal" align="center" />
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
const searchItemId = ref('')
const searchInboundId = ref('')
const searchGoodsId = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份
const originalTableData = [
  {
    inbound_item_id: 'II001',
    inbound_id: 'I001',
    goods_id: 'G001',
    quantity: 10,
    unit_cost: 5999.0,
    subtotal: 59990.0,
  },
  {
    inbound_item_id: 'II002',
    inbound_id: 'I001',
    goods_id: 'G002',
    quantity: 20,
    unit_cost: 3999.0,
    subtotal: 79980.0,
  },
  {
    inbound_item_id: 'II003',
    inbound_id: 'I002',
    goods_id: 'G003',
    quantity: 15,
    unit_cost: 299.0,
    subtotal: 4485.0,
  },
  {
    inbound_item_id: 'II004',
    inbound_id: 'I003',
    goods_id: 'G004',
    quantity: 30,
    unit_cost: 99.0,
    subtotal: 2970.0,
  },
  {
    inbound_item_id: 'II005',
    inbound_id: 'I003',
    goods_id: 'G005',
    quantity: 5,
    unit_cost: 1999.0,
    subtotal: 9995.0,
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

  // 入库明细ID精确查询
  if (searchItemId.value) {
    data = data.filter((item) => item.inbound_item_id === searchItemId.value)
  }

  // 入库单ID精确查询
  if (searchInboundId.value) {
    data = data.filter((item) => item.inbound_id === searchInboundId.value)
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
  alert(`编辑索引: ${index}, 入库明细ID: ${row.inbound_item_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 入库明细ID: ${row.inbound_item_id}`)
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
