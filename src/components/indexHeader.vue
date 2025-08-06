<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#fff"
    active-text-color="#fff"
    background-color="#333333"
    :collapse="false"
    unique-opened="true"
    ellipsis="true"
    router="true"
    @select="handleSelect"
  >
    <div class="logo">
      <img src="/img/logo.png" alt="logo图片" />
    </div>
    <div class="logoName">
      <h2 style="color: white; font-size: 30px">联运通达</h2>
    </div>
    <el-menu-item index="/index">首页</el-menu-item>
    <el-menu-item index="/productService">产品服务</el-menu-item>
    <el-menu-item index="3">接口API</el-menu-item>
    <el-menu-item index="6">大屏展示</el-menu-item>
    <el-menu-item index="4">关于我们</el-menu-item>
    <div class="phone">
      <el-icon><Phone /></el-icon>联系电话 500-345623
    </div>

    <el-button @click="jumpToLogin" class="login" type="text"
      ><el-icon><UserFilled /></el-icon>登录</el-button
    >

    <el-button @click="jumpToRegister" class="register" type="primary">免费注册</el-button>
  </el-menu>
</template>

<script lang="ts" setup>
import { jumpToLogin, jumpToRegister } from '../../public/javascript/routerToJump'
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

defineOptions({
  name: 'indexHeader',
})
</script>

<style scoped>
.logo {
  width: 80px;
  margin-left: 5%;
}

.logo img {
  height: 100%;
  width: 100%;
}

.logoName {
  display: inline-block;
  vertical-align: top;
  margin-left: 2%;
  padding-right: 6%;
  margin-top: 10px;
}
.phone {
  margin-left: 5%;
  color: white;
  margin-top: 18px;
}
.login {
  margin-left: 16%;
  margin-top: 12px;
}
.register {
  margin-top: 12px;
  width: 80px;
}
</style>
