<template>
  <div class="login">
    <login-panel />
  </div>
</template>
<script lang="ts" setup>
import loginPanel from './cpns/login-panel.vue'
import localCache from '@/utils/cache'
import request from '@/request'
import { useRouter } from 'vue-router'
const router = useRouter()
if (localCache.getCache('token') !== undefined && localCache.getCache('token') !== null) {
  request
    .get('/auth/testToken', {
      headers: { Authorization: ` ${localCache.getCache('token')}` }
    })
    .then((response) => {
      console.log(response)
      if (response.status === 0) {
        router.push('/authmain/operateContent')
      } else {
        localCache.deleteCache('token')
      }
    })
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  background: url('../../assets/img/login-bg.svg');
}
</style>
