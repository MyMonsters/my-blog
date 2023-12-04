<template>
  <div class="login-qrcode" id="login_container">
    <div class="flex justify-around items-center">
      请使用手机扫码登录
      <span class="flex items-center" @click="handleReloadQrcode">刷新<SyncOutlined /></span>
    </div>
    <div class="border mt-10">
      <img :src="url" class="w-full" />
    </div>

    <!-- <a-form :rules="rules" :model="phone" ref="formRef">
      <a-form-item label="手机号：" prop="number">
        <a-input v-model="phone.number" />
      </a-form-item>
      <a-form-item label="验证码：" prop="verifycode">
        <div class="get-code">
          <a-input v-model="phone.verifycode" show-password />
          <a-button type="primary" class="codebutton">获取验证码</a-button>
        </div>
      </a-form-item>
    </a-form> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getQrcodeImgAPI, checkQrcodeStatusAPI } from '@/api/auth/api'
import { SyncOutlined } from '@ant-design/icons-vue'
import { QrcodeStatus } from '../config/account-config'
import { useAuthStore } from '@/store/modules/auth'
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'
const router = useRouter()
const url = ref()
const uuid = ref(uuidv4())
let timer
const AuthStore = useAuthStore()
// const formRef = ref()
// const loginAction = (isKeepPassword: boolean) => {
//   console.log('正在进行登录')
//   formRef.value?.validate((valid: boolean) => {
//     if (valid) {
//       if (isKeepPassword) {
//         //缓存
//       }
//     }
//   })
// }
getQrcodeImgAPI(uuid.value).then((res) => {
  url.value = res.url
})
const handleReloadQrcode = () => {
  // const uuid =
  const newuuid = uuidv4()
  getQrcodeImgAPI(newuuid).then((res) => {
    uuid.value = newuuid
    url.value = res.url
  })
}
onMounted(() => {
  timer = setInterval(() => {
    checkQrcodeStatusAPI(uuid.value).then((res) => {
      switch (res.status) {
        case QrcodeStatus.SUCCESS:
          AuthStore.setToken(res.token as string)
          AuthStore.setAccount({ username: '一团一团亮晶晶', password: 'mypassword' })
          localCache.setCache('token', res.token as string)
          // 2.跳到发表文章页面
          clearInterval(timer)
          router.push('/authmain/operateContent')
          break
        case QrcodeStatus.EXPIRED:
          handleReloadQrcode()
          break
        case QrcodeStatus.NOTSCAN:
          break
      }
    })
  }, 1000)
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.codebutton {
  margin-left: 10px;
}
</style>
