<template>
  <div class="table-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <div class="search-group">
        <el-input v-model="searchId" placeholder="货物ID精确查询（如G001）" class="search-input" />
        <el-input v-model="searchName" placeholder="货物名称模糊查询" class="search-input" />
      </div>
      <div class="button-group">
        <el-button type="primary" class="action-btn" @click="fetchData">查询</el-button>
        <el-button class="action-btn" @click="handleReset">重置</el-button>
        <el-button type="success" class="action-btn" @click="handleAdd">新增货物</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table :data="paginatedData" class="modern-table" style="width: 100%">
      <el-table-column label="货物编号" prop="goods_id" align="center" />
      <el-table-column label="货物名称" prop="goods_name" align="center" />
      <el-table-column label="类别ID" prop="category_id" align="center" />
      <el-table-column label="规格" prop="specification" align="center" />
      <el-table-column label="重量(kg)" prop="weight" align="center" />
      <el-table-column label="体积(m³)" prop="volume" align="center" />
      <el-table-column label="单价" prop="unit_price" align="center" />
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
const searchId = ref('')
const searchName = ref('')
// 表格数据
const tableData = ref([])
const filteredData = ref([])
// 原始数据备份
const originalTableData = [
  {
    goods_id: 'G001',
    goods_name: '笔记本电脑',
    category_id: 'C001',
    specification: '15英寸/i7/16G/512G',
    weight: 2.3,
    volume: 0.03,
    unit_price: 6999.0,
    status: '在售',
  },
  {
    goods_id: 'G002',
    goods_name: '智能手机',
    category_id: 'C002',
    specification: '6.7英寸/256G',
    weight: 0.18,
    volume: 0.0012,
    unit_price: 4999.0,
    status: '在售',
  },
  {
    goods_id: 'G003',
    goods_name: '机械键盘',
    category_id: 'C003',
    specification: '青轴/全尺寸',
    weight: 0.85,
    volume: 0.015,
    unit_price: 399.0,
    status: '下架',
  },
  {
    goods_id: 'G004',
    goods_name: '无线鼠标',
    category_id: 'C003',
    specification: '可充电/静音',
    weight: 0.12,
    volume: 0.002,
    unit_price: 129.0,
    status: '停产',
  },
  {
    goods_id: 'G005',
    goods_name: '4K显示器',
    category_id: 'C004',
    specification: '27英寸/IPS',
    weight: 5.0,
    volume: 0.07,
    unit_price: 2499.0,
    status: '在售',
  },
  {
    goods_id: 'G006',
    goods_name: 'USB-C Hub',
    category_id: 'C005',
    specification: '多接口/PD充电',
    weight: 0.15,
    volume: 0.005,
    unit_price: 199.0,
    status: '在售',
  },
  {
    goods_id: 'G007',
    goods_name: '智能音箱',
    category_id: 'C006',
    specification: '语音识别/智能控制',
    weight: 0.2,
    volume: 0.003,
    unit_price: 299.0,
    status: '在售',
  },
  {
    goods_id: 'G008',
    goods_name: '便携式硬盘',
    category_id: 'C007',
    specification: '1TB/USB 3.0',
    weight: 0.25,
    volume: 0.02,
    unit_price: 499.0,
    status: '在售',
  },
  {
    goods_id: 'G009',
    goods_name: '智能手表',
    category_id: 'C008',
    specification: '心率监测/智能通知',
    weight: 0.18,
    volume: 0.0015,
    unit_price: 199.0,
    status: '在售',
  },
  {
    goods_id: 'G010',
    goods_name: '游戏手柄',
    category_id: 'C009',
    specification: '蓝牙/多平台兼容',
    weight: 0.3,
    volume: 0.004,
    unit_price: 299.0,
    status: '在售',
  },
  {
    goods_id: 'G011',
    goods_name: '高清摄像头',
    category_id: 'C010',
    specification: '1080P/自动对焦',
    weight: 0.2,
    volume: 0.0025,
    unit_price: 399.0,
    status: '在售',
  },
  {
    goods_id: 'G012',
    goods_name: '智能音箱',
    category_id: 'C006',
    specification: '语音识别/智能控制',
    weight: 0.2,
    volume: 0.003,
    unit_price: 299.0,
    status: '在售',
  },
  {
    goods_id: 'G013',
    goods_name: '便携式硬盘',
    category_id: 'C007',
    specification: '1TB/USB 3.0',
    weight: 0.25,
    volume: 0.02,
    unit_price: 499.0,
    status: '在售',
  },
  {
    goods_id: 'G014',
    goods_name: '智能手表',
    category_id: 'C008',
    specification: '心率监测/智能通知',
    weight: 0.18,
    volume: 0.0015,
    unit_price: 199.0,
    status: '在售',
  },
  {
    goods_id: 'G015',
    goods_name: '游戏手柄',
    category_id: 'C009',
    specification: '蓝牙/多平台兼容',
    weight: 0.3,
    volume: 0.004,
    unit_price: 299.0,
    status: '在售',
  },
  {
    goods_id: 'G016',
    goods_name: '智能音箱',
    category_id: 'C006',
    specification: '语音识别/智能控制',
    weight: 0.2,
    volume: 0.003,
    unit_price: 299.0,
    status: '在售',
  },
  {
    goods_id: 'G017',
    goods_name: '便携式硬盘',
    category_id: 'C007',
    specification: '1TB/USB 3.0',
    weight: 0.25,
    volume: 0.02,
    unit_price: 499.0,
    status: '在售',
  },
  {
    goods_id: 'G018',
    goods_name: '智能手表',
    category_id: 'C008',
    specification: '心率监测/智能通知',
    weight: 0.18,
    volume: 0.0015,
    unit_price: 199.0,
    status: '在售',
  },
  {
    goods_id: 'G019',
    goods_name: '游戏手柄',
    category_id: 'C009',
    specification: '蓝牙/多平台兼容',
    weight: 0.3,
    volume: 0.004,
    unit_price: 299.0,
    status: '在售',
  },
  {
    goods_id: 'G020',
    goods_name: '高清摄像头',
    category_id: 'C010',
    specification: '1080P/自动对焦',
    weight: 0.2,
    volume: 0.0025,
    unit_price: 399.0,
    status: '在售',
  },
]

// 分页相关变量
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

// 状态标签类型映射
const getStatusTagType = (status) => {
  switch (status) {
    case '在售':
      return 'success'
    case '下架':
      return 'warning'
    case '停产':
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

  // ID精确查询
  if (searchId.value) {
    data = data.filter((item) => item.goods_id === searchId.value)
  }

  // 名称模糊查询
  if (searchName.value) {
    const keyword = searchName.value.toLowerCase()
    data = data.filter((item) => item.goods_name.toLowerCase().includes(keyword))
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

// 编辑和删除方法 - 修复货物ID属性名
const handleEdit = (index, row) => {
  alert(`编辑索引: ${index}, 货物ID: ${row.goods_id}`)
}
const handleDelete = (index, row) => {
  alert(`删除索引: ${index}, 货物ID: ${row.goods_id}`)
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
