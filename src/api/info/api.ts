import request from '@/request'
import localCache from '@/utils/cache'
export function getAllArticles() {
  return request.get('/record/getAllArticles')
}
export function getTimeline() {
  return request.get('/record/getTimeline')
}

export function getTodoList() {
  return request.get('record/getTodolist')
}
export function testToken() {
  return request.get('/auth/testToken', {
    headers: { Authorization: ` ${localCache.getCache('token')}` }
  })
}
export function getComment() {
  return request.get('/record/getComment')
}
export function getLabel() {
  return request.get('/record/getLabel')
}
export function getArticleByLabelName(label_name: string | string[]) {
  return request.get(`/record/getArticleByLabelName/${label_name}`)
}
