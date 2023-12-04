<template>
  <div class="login-account">
    <!-- <a-form :rules="rules" :model="account" ref="formRef">
			<a-form-item label="账号：" name="username">
				<a-input v-model:value="account.username" />
			</a-form-item>
			<a-form-item label="密码：" name="password">
				<a-input
					type="password"
					v-model:value="account.password"
					show-password
				/>
			</a-form-item>
		</a-form> -->
    <a-form :rules="rules" :model="account" ref="formRef">
      <a-form-item label="账号" name="name" :rules="rules">
        <a-input v-model:value="account.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="rules">
        <a-input-password v-model:value="account.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref, defineExpose } from 'vue'
import localCache from '@/utils/cache'
import { rules } from '../config/account-config'
import { useAuthStore } from '@/store/modules/auth'
const useForm = Form.useForm

const account = reactive({
  username: localCache.getCache('username') ?? '',
  password: localCache.getCache('password') ?? '',
  remember: localCache.getCache('remember') ?? ''
})
const authStore = useAuthStore()
const { validate } = useForm(account, rules)
const formRef = ref()

const loginAction = (isKeepPassword: boolean) => {
  console.log('正在进行登录')
  validate().then(() => {
    console.log('登录成功！')
    if (isKeepPassword) {
      localCache.setCache('name', account.username)
      localCache.setCache('password', account.password)
      authStore.accountLoginAction(account)
    } else {
      localCache.deleteCache('name')
      localCache.deleteCache('password')
    }
  })

  // formRef.value.validate((valid) => {
  // 	console.log(valid)
  // 	if (valid) {
  // 		console.log('登录成功！')
  // 		if (isKeepPassword) {
  // 			localCache.setCache('name', account.name)
  // 			localCache.setCache('password', account.password)
  // 			store.dispatch('login/accountLoginAction', { ...account })
  // 		} else {
  // 			localCache.deleteCache('name')
  // 			localCache.deleteCache('password')
  // 		}
  // 	}
  // })
}
defineExpose({
  loginAction
})
</script>

<style scoped></style>
