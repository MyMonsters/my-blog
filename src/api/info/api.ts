import request from '@/request'
export function getAllArticles<T = any>() {
  return request.get<T>('/record/getAllArticles')
}
export function getTimeline<T = any>() {
  return request.get<T>('/record/getTimeline')
}

export function getTodoList<T=any>() {
    return request.get<T>('record/getTodolist')
}