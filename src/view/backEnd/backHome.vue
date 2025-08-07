<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside-container">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              style="margin: 0"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
              router="true"
              unique-opened="true"
            >
              <el-menu-item index="/backHome">
                <template #title>
                  <el-icon><HomeFilled /></el-icon>
                  <span>数据统计中心</span>
                </template>
              </el-menu-item>

              <el-sub-menu index="2">
                <template #title>
                  <el-icon><UserFilled /></el-icon>
                  <span>安全中心</span>
                </template>
                <el-menu-item-group title="用户信息设置">
                  <el-menu-item index="2-1"
                    ><el-icon><Platform /></el-icon>安全设置</el-menu-item
                  >
                  <el-menu-item index="2-2">账号信息</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="3">
                <template #title>
                  <el-icon><Odometer /></el-icon>
                  <span>基础数据管理</span>
                </template>
                <el-menu-item-group title="存储全系统通用的基础信息">
                  <el-menu-item index="/cargoCategoryMg">货物分类表</el-menu-item>
                  <el-menu-item index="">供应商表</el-menu-item>
                  <el-menu-item index="/employeeMg">员工表</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="4">
                <template #title>
                  <el-icon><Box /></el-icon>
                  <span>货物管理</span>
                </template>
                <el-menu-item-group title="管理具体货物的信息及库存基准数据">
                  <el-menu-item index="/cargoMg">货物管理</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="5">
                <template #title>
                  <el-icon><OfficeBuilding /></el-icon>
                  <span>仓储管理</span>
                </template>
                <el-menu-item-group title="负责货物的存储、出入库操作及库存变动记录">
                  <el-menu-item index="/housewaveMg">仓库表</el-menu-item>
                  <el-menu-item index="/inventoryMg">库存表</el-menu-item>
                  <el-menu-item index="">入库单表</el-menu-item>
                  <el-menu-item index="">入库明细表</el-menu-item>
                  <el-menu-item index="">出库单表</el-menu-item>
                  <el-menu-item index="">出库明细表</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="6">
                <template #title>
                  <el-icon><Compass /></el-icon>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group title="管理订单的变动记录及订单的明细信息">
                  <el-menu-item index="/orderMg">订单主表</el-menu-item>
                  <el-menu-item index="/orderInfoMg">订单明细表</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="7">
                <template #title>
                  <el-icon><Van /></el-icon>
                  <span>运输管理</span>
                </template>
                <el-menu-item-group title="管理运输车辆、运输记录及相关信息">
                  <el-menu-item index="">车辆表</el-menu-item>
                  <el-menu-item index="">物流表</el-menu-item>
                  <el-menu-item index="">车辆运输记录表</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="8">
                <template #title>
                  <el-icon><Setting /></el-icon>
                  <span>用户权限管理</span>
                </template>
                <el-menu-item-group title="权限设置">
                  <el-menu-item index="4-1">用户管理</el-menu-item>
                  <el-menu-item index="4-2">角色管理</el-menu-item>
                  <el-menu-item index="4-3">权限管理</el-menu-item>
                  <el-menu-item index="4-4">日志管理</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row></el-aside
      >
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="js" setup>
import router from '@/router'

import '../../../public/scss/backHome.scss'
</script>
<style scoped></style>
