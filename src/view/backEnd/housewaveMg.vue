<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input
          v-model="searchWarehouseId"
          placeholder="仓库ID精确查询（如W001）"
          class="search-input"
        />
        <el-input
          v-model="searchWarehouseName"
          placeholder="仓库名称模糊查询"
          class="search-input"
        />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增仓库</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="仓库ID" prop="warehouse_id" align="center" />
      <el-table-column label="仓库名称" prop="warehouse_name" align="center" />
      <el-table-column label="地址" prop="address" align="center" />
      <el-table-column label="管理员ID" prop="manager_id" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)" size="small">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" prop="contact_phone" align="center" />
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
const searchWarehouseId = ref('')
const searchWarehouseName = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份 - 仓库表示例数据
const originalTableData = [
  {
    warehouse_id: 'W001',
    warehouse_name: '上海总仓库',
    address: '上海市浦东新区张江高科技园区博云路2号',
    manager_id: 'E001',
    status: '正常',
    contact_phone: '021-58887777',
  },
  {
    warehouse_id: 'W002',
    warehouse_name: '北京分仓库',
    address: '北京市朝阳区建国路88号',
    manager_id: 'E002',
    status: '正常',
    contact_phone: '010-67778888',
  },
  {
    warehouse_id: 'W003',
    warehouse_name: '广州分仓库',
    address: '广州市天河区珠江新城冼村路5号',
    manager_id: 'E004',
    status: '维护',
    contact_phone: '020-38889999',
  },
  {
    warehouse_id: 'W004',
    warehouse_name: '深圳分仓库',
    address: '深圳市南山区科技园科苑路8号',
    manager_id: 'E006',
    status: '停用',
    contact_phone: '0755-26667777',
  },
  {
    warehouse_id: 'W005',
    warehouse_name: '成都分仓库',
    address: '成都市高新区天府大道1480号',
    manager_id: 'E008',
    status: '正常',
    contact_phone: '028-85556666',
  },
  {
    warehouse_id: 'W006',
    warehouse_name: '武汉分仓库',
    address: '武汉市洪山区光谷大道70号',
    manager_id: 'E010',
    status: '维护',
    contact_phone: '027-87779999',
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
    case '停用':
      return 'danger'
    case '维护':
      return 'warning'
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

  // 仓库ID精确查询
  if (searchWarehouseId.value) {
    data = data.filter((item) => item.warehouse_id === searchWarehouseId.value)
  }

  // 仓库名称模糊查询
  if (searchWarehouseName.value) {
    const keyword = searchWarehouseName.value.toLowerCase()
    data = data.filter((item) => item.warehouse_name.toLowerCase().includes(keyword))
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
  searchWarehouseId.value = ''
  searchWarehouseName.value = ''
  fetchData()
}

// 新增仓库
const handleAdd = () => {
  alert('新增仓库功能待实现')
}

// 编辑和删除方法
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 仓库ID: ${row.warehouse_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 仓库ID: ${row.warehouse_id}`)
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
