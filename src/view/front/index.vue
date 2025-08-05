<template>
  <main>
    <div class="main-part">
      <div class="main">
        <div class="info1">
          <div class="info1">新用户注册即送<b>7</b>款产品</div>
          <div class="info2">七款热门产品,最高可达<b>5000</b>次</div>
        </div>
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="img"></div>
        <div id="freeToUse" @click="jumpToRegister">免费试用</div>
      </div>
    </div>
  </main>
  <footer>
    <div class="copyRight">
      <div>
        @版权所有：浙江省联运通达数据技术服务有限公司
        <br />
        浙PRF备13510958号-1 增值电信业务许可证：合字C2-205680224 浙公安备案号：4404556702993
      </div>
    </div>
  </footer>
</template>

<script lang="js" setup>
import '../../../public/scss/index.css'
import { jumpToRegister } from '../../../public/javascript/routerToJump.js'
</script>

<style scoped></style>
