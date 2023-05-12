import { defineStore } from 'pinia'

export const useInfoStore = defineStore('infoState', {
  // id: 必须的，在所有 Store 中唯一
  // state: 返回对象的函数
  state: () => ({
    timeline: [],
    todolist: [],
    currentArticle: {},
    currentEditArticle: {},
    articles: [],
    comments: [],
    currentCommentId: -1
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTimeline(timeline: any) {
      this.timeline = timeline
    },
    setTodolist(todolist: any) {
      this.todolist = todolist
    },
    setCurrentArticle(currentArticle: any) {
      this.currentArticle = currentArticle
    },
    setCurrentEditArticle(currentEditArticle: any) {
      this.currentEditArticle = currentEditArticle
    },
    setArticles(articles: any) {
      this.articles = articles
    },
    setComments(comments: any) {
      this.comments = comments
    },
    setCurrentCommentId(id: any) {
      this.currentCommentId = id
    }
  },

  persist: {
    key: 'infoState',
    storage: window.localStorage
  }
})
