import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',
  // state: 返回对象的函数
  state: () => ({
    token: '',
    account: {},
    articles: []
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {},

  persist: {
    key: 'userState',
    storage: window.localStorage
  }
})
