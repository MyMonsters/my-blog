import { defineStore } from 'pinia'

export const useSettingStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'settingState',
  // state: 返回对象的函数
  state: () => ({
    isDark: false
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    setIsDark(isDark: any) {
      this.isDark = isDark
    }
  }
})
