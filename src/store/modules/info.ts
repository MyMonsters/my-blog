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
    currentCommentId: -1,
    labels: [],
    currentLabelID: -1
  }),
  getters: {
    getArticleById: (state) => {
      return (id: number) =>
        state.articles.find((item: Article) => {
          return item.id === id
        })
    }
  },
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
    },
    setLabel(labels: any) {
      this.labels = labels
    },
    setCurrentLabelID(label_id: any) {
      this.currentLabelID = label_id
    }
  },

  persist: {
    key: 'infoState',
    storage: window.localStorage
  }
})
