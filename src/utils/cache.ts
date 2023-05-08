class LocalCache {
  setCache(key: string, value: string) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  claerCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
