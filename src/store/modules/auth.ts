import { accountLoginAPI } from '@/api/auth/api'
import { defineStore } from 'pinia'
import localCache from '@/utils/cache'
import { message } from 'ant-design-vue'
import { router } from '@/router'

export const useAuthStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'authState',
  // state: 返回对象的函数
  state: () => ({
    token: '',
    account: {},
    currentAtricle: {
      content: '',
      title: '',
      category: '',
      type: '',
      description: ''
    }
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAccount(account: { username: string; password: string }) {
      this.account = account
    },
    async accountLoginAction(account: Account) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginAPI(account)
      console.log('loginResult', loginResult)
      if (loginResult.code === 200) {
        const { token } = loginResult
        this.setToken(token)
        this.setAccount(account)
        localCache.setCache('token', token)
        // 2.跳到发表文章页面
        router.push('/authmain/operateContent')
      } else {
        message.error(loginResult.message)
      }
    }
  },

  persist: {
    key: 'authState',
    storage: window.localStorage
  }
})
