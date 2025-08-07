<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input v-model="searchOrderId" placeholder="订单ID查询" class="search-input" />
        <el-input v-model="searchGoodsId" placeholder="商品ID查询" class="search-input" />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增明细</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="明细ID" prop="item_id" align="center" />
      <el-table-column label="订单ID" prop="order_id" align="center" />
      <el-table-column label="商品ID" prop="goods_id" align="center" />
      <el-table-column label="数量" prop="quantity" align="center" />
      <el-table-column label="单价" prop="unit_price" align="center" />
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
const searchOrderId = ref('')
const searchGoodsId = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份 - 订单明细表示例数据
const originalTableData = [
  {
    item_id: 'I001',
    order_id: 'O001',
    goods_id: 'G001',
    quantity: 2,
    unit_price: 1999.0,
    subtotal: 3998.0,
  },
  {
    item_id: 'I002',
    order_id: 'O001',
    goods_id: 'G002',
    quantity: 1,
    unit_price: 2999.0,
    subtotal: 2999.0,
  },
  {
    item_id: 'I003',
    order_id: 'O002',
    goods_id: 'G003',
    quantity: 5,
    unit_price: 599.0,
    subtotal: 2995.0,
  },
  {
    item_id: 'I004',
    order_id: 'O003',
    goods_id: 'G001',
    quantity: 1,
    unit_price: 1999.0,
    subtotal: 1999.0,
  },
  {
    item_id: 'I005',
    order_id: 'O004',
    goods_id: 'G004',
    quantity: 3,
    unit_price: 899.0,
    subtotal: 2697.0,
  },
  {
    item_id: 'I006',
    order_id: 'O005',
    goods_id: 'G005',
    quantity: 2,
    unit_price: 1299.0,
    subtotal: 2598.0,
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

  // 订单ID查询
  if (searchOrderId.value) {
    data = data.filter((item) => item.order_id.includes(searchOrderId.value))
  }

  // 商品ID查询
  if (searchGoodsId.value) {
    data = data.filter((item) => item.goods_id.includes(searchGoodsId.value))
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
  searchOrderId.value = ''
  searchGoodsId.value = ''
  fetchData()
}

// 新增订单明细
const handleAdd = () => {
  alert('新增订单明细功能待实现')
}

// 编辑和删除方法
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 明细ID: ${row.item_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 明细ID: ${row.item_id}`)
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
