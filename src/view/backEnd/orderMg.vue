<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="货物编号" prop="cargoId" />
    <el-table-column label="货物名称" prop="cargoName" />
    <el-table-column label="货物类型" prop="cargoType" />
    <el-table-column label="货物重量" prop="cargoWeight" />
    <el-table-column label="是否危险" prop="cargoIsDangerous" />
    <el-table-column label="运输ID" prop="transportId" />
    <el-table-column label="日期" prop="date" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索框" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) => !search.value || data.cargoName.toLowerCase().includes(search.value.toLowerCase()),
  ),
)
// 移除函数参数类型注解
const handleEdit = (index, row) => {
  alert(index, row)
}
const handleDelete = (index, row) => {
  alert(index, row)
}

// 移除数组类型注解
const tableData = [
  {
    cargoId: 1,
    cargoName: 'Cargo A',
    cargoType: 'Type 1',
    cargoWeight: 100,
    cargoIsDangerous: false,
    transportId: 1,
    date: '2016-05-03',
  },
  {
    cargoId: 2,
    cargoName: 'Cargo B',
    cargoType: 'Type 2',
    cargoWeight: 200,
    cargoIsDangerous: true,
    transportId: 2,
    date: '2016-05-01',
  },
  {
    cargoId: 3,
    cargoName: 'Cargo C',
    cargoType: 'Type 3',
    cargoWeight: 300,
    cargoIsDangerous: false,
    transportId: 3,
    date: '2016-05-01',
  },
  {
    cargoId: 4,
    cargoName: 'Cargo D',
    cargoType: 'Type 4',
    cargoWeight: 400,
    cargoIsDangerous: true,
    transportId: 4,
    date: '2016-05-01',
  },
]
</script>
