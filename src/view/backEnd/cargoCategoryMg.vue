<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input
          v-model="searchCategoryId"
          placeholder="分类ID精确查询（如C001）"
          class="search-input"
        />
        <el-input
          v-model="searchCategoryName"
          placeholder="分类名称模糊查询"
          class="search-input"
        />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增分类</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="分类ID" prop="category_id" align="center" />
      <el-table-column label="分类名称" prop="category_name" align="center" />
      <el-table-column label="父分类ID" prop="parent_id" align="center">
        <template #default="scope">
          {{ scope.row.parent_id || '无' }}
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
const searchCategoryId = ref('')
const searchCategoryName = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份 - 货物分类表示例数据
const originalTableData = [
  {
    category_id: 'C001',
    category_name: '电脑设备',
    parent_id: null,
  },
  {
    category_id: 'C002',
    category_name: '笔记本电脑',
    parent_id: 'C001',
  },
  {
    category_id: 'C003',
    category_name: '台式电脑',
    parent_id: 'C001',
  },
  {
    category_id: 'C004',
    category_name: '移动设备',
    parent_id: null,
  },
  {
    category_id: 'C005',
    category_name: '智能手机',
    parent_id: 'C004',
  },
  {
    category_id: 'C006',
    category_name: '平板电脑',
    parent_id: 'C004',
  },
  {
    category_id: 'C007',
    category_name: '配件',
    parent_id: null,
  },
  {
    category_id: 'C008',
    category_name: '键盘鼠标',
    parent_id: 'C007',
  },
  {
    category_id: 'C009',
    category_name: '显示器',
    parent_id: 'C007',
  },
  {
    category_id: 'C010',
    category_name: '音箱耳机',
    parent_id: 'C007',
  },
  {
    category_id: 'C011',
    category_name: '存储设备',
    parent_id: null,
  },
  {
    category_id: 'C012',
    category_name: '移动硬盘',
    parent_id: 'C011',
  },
  {
    category_id: 'C013',
    category_name: 'U盘',
    parent_id: 'C011',
  },
  {
    category_id: 'C014',
    category_name: '网络设备',
    parent_id: null,
  },
  {
    category_id: 'C015',
    category_name: '路由器',
    parent_id: 'C014',
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

  // 分类ID精确查询
  if (searchCategoryId.value) {
    data = data.filter((item) => item.category_id === searchCategoryId.value)
  }

  // 分类名称模糊查询
  if (searchCategoryName.value) {
    const keyword = searchCategoryName.value.toLowerCase()
    data = data.filter((item) => item.category_name.toLowerCase().includes(keyword))
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
  searchCategoryId.value = ''
  searchCategoryName.value = ''
  fetchData()
}

// 新增分类
const handleAdd = () => {
  alert('新增分类功能待实现')
}

// 编辑和删除方法
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 分类ID: ${row.category_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 分类ID: ${row.category_id}`)
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
