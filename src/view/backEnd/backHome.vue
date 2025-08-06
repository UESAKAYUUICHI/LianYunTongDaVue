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
            >
              <el-menu-item index="1">
                <template #title>
                  <el-icon><HomeFilled /></el-icon>
                  <span>服务管理</span>
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
                  <el-icon><Compass /></el-icon>
                  <span>后台管理</span>
                </template>
                <el-menu-item-group title="基础事务设置">
                  <el-menu-item index="/cargoMg">货物管理</el-menu-item>
                  <el-menu-item index="3-2">订单管理</el-menu-item>
                  <el-menu-item index="3-3">仓库管理</el-menu-item>
                  <el-menu-item index="3-4">物流管理</el-menu-item>
                  <el-menu-item index="3-5">账单下载</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-sub-menu index="4">
                <template #title>
                  <el-icon><Opportunity /></el-icon>
                  <span>用户权限管理</span>
                </template>
                <el-menu-item-group title="权限设置">
                  <el-menu-item index="4-1">用户管理</el-menu-item>
                  <el-menu-item index="4-2">角色管理</el-menu-item>
                  <el-menu-item index="4-3">权限管理</el-menu-item>
                  <el-menu-item index="4-4">接口密钥管理</el-menu-item>
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
