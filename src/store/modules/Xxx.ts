import { defineStore } from 'pinia'

export const useXxxStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'XxxState',
  // state: 返回对象的函数
  state: () => ({}),
  getters: {},
  // 可以同步 也可以异步
  actions: {},

  persist: {
    key: 'XxxState',
    storage: window.localStorage
  }
})
