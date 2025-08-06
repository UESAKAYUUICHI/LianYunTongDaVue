<template class="body">
  <!-- 仿制飞书的注册页面 -->
  <div class="bg-container">
    <el-card class="login-card">
      <!-- 账号密码登录 -->
      <div class="account-login" v-if="loginType">
        <h1 class="login-title">手机号注册</h1>
        <el-form :model="registerForm" class="login-form" label-width="80px">
          <el-form-item label="手机号:">
            <el-input
              v-model="registerForm.phone"
              placeholder="请输入手机号"
              class="login-input"
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="验证码:">
            <el-input
              v-model="registerForm.validateCode"
              placeholder="请输入验证码"
              class="login-input"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item class="login-button-group">
            <el-button @click="sendRegister" type="primary" class="login-button" block
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 二维码登录 -->
      <div class="qrcode-login" v-if="!loginType">
        <div style="text-align: center">
          <p style="font-size: 25px; font-weight: bold">扫码注册</p>
          <p>扫描二维码之后请关注公众号以注册</p>
        </div>
        <el-image :src="qrcode" style="width: 200px; height: 200px" :fit="fit" />
      </div>
      <!-- 右上角图标 -->
      <div class="login-icon" @click="changeLoginType">
        <el-tooltip
          class="custom-tooltip"
          :content="loginType ? '扫码注册' : '手机号注册'"
          placement="left-start"
        >
          <el-image
            v-if="!loginType"
            :src="computerIcon"
            style="width: 30px; height: 30px; margin: 5px 2px 5px 18px"
            :fit="fit"
          />

          <el-image
            v-if="loginType"
            :src="qrcodeIcon"
            style="width: 30px; height: 30px; margin: 5px 2px 5px 18px"
            :fit="fit"
          />
        </el-tooltip>
      </div>
      <!-- 白色遮挡 -->
      <div class="white-cover"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import computerIcon from '/png/computer.png'
import qrcodeIcon from '/png/qrcode.png'
import qrcode from '/png/qrcode.jpg'

const registerForm = reactive({
  phone: '',
  validateCode: '',
})
const loginType = ref(false)
const changeLoginType = () => {
  loginType.value = !loginType.value
}

function sendRegister() {
  console.log('测试注册点击,传的值为' + registerForm.phone + registerForm.validateCode)
  alert('注册成功')
}
</script>

<style lang="scss" scoped>
.bg-container {
  width: 100%;
  background-image: url(../../../public/img/loginBg.jpg);
  height: 100vh;
  background-size: 100% 110%;
}
.login-card {
  margin: 0 auto;
  width: 400px;
  min-width: 400px;
  height: 400px;
  position: relative;
  top: 50px;
}
.account-login,
.qrcode-login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.account-login {
  margin-top: 40px;
}

.login-icon {
  position: absolute;
  top: 0;
  right: 0;
  background: #82a7fc;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.login-icon:hover {
  background: #4e83fd;
}
.white-cover {
  width: 70.71px;
  height: 70.71px;
  position: absolute;
  background-color: white;
  top: 15px;
  right: 15px;
  transform: rotate(45deg);
}

/* 标题样式 */
.login-title {
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
}

/* 表单样式 */
.login-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 输入框样式 */
.login-input {
  height: 42px;
  border-radius: 6px;
}

/* 按钮组样式 */
.login-button-group {
  margin-top: 20px;
}

/* 登录按钮样式 */
.login-button {
  width: 80%;
  height: 44px;
  font-size: 16px;
  border-radius: 6px;
}
</style>
