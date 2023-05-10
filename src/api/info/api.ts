import request from '@/request'
import localCache from '@/utils/cache'
export function getAllArticles<T = any>() {
  return request.get<T>('/record/getAllArticles')
}
export function getTimeline<T = any>() {
  return request.get<T>('/record/getTimeline')
}

export function getTodoList<T = any>() {
  return request.get<T>('record/getTodolist')
}
export function testToken() {
  return request.get('/auth/testToken', {
    headers: { Authorization: ` ${localCache.getCache('token')}` }
  })
}
