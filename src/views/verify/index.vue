<template>
  <div class="w-2/3 m-auto mt-32">
    <a-input v-model:value="code" placeholder="请输入登录码" />
    <a-button @click="handleVerify" class="mt-12">验证</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { verifyQrcodeAPI } from '@/api/auth/api'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
const Route = useRoute()
const uuid: string = Route.params.uuid as string
console.log(uuid)
const code = ref<string>()
const handleVerify = () => {
  if (!code.value) {
    message.error('code值不为空！')
  }
  verifyQrcodeAPI(uuid, code.value).then((res) => {
    console.log(res.msg)
    message.info(res.msg)
  })
}
</script>

<style scoped></style>
