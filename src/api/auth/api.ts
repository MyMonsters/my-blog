import request from '@/request'
import qs from 'qs'
import localCache from '@/utils/cache'

const token = localCache.getCache('token')
//操作article
export function accountLoginAPI(account: Account): Promise<LoginAPIRes> {
  return request.post('/log/login', qs.stringify(account))
}
export function removeArticle(id: string): Promise<RemoveArticleRes> {
  return request.post('/auth/removeArticle', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addArticle(article: Article): Promise<AddArticleRes> {
  return request.post('/auth/addArticle', qs.stringify(article), {
    headers: { Authorization: ` ${token}` }
  })
}
export function updateArticle(article: Article) {
  return request.post('/auth/updateArticle', qs.stringify(article), {
    headers: { Authorization: ` ${token}` }
  })
}

export function updateImg(formData: FormData) {
  return request.post('/uploadImg', formData, {
    headers: { Authorization: ` ${token}` }
  })
}
//操作Todolist
export function doneTodoAPI(id: string) {
  return request.post('/auth/doneTodo', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function removeTodoAPI(id: string): Promise<{ status: number }> {
  return request.post('/auth/removeTodo', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addTodoAPI(title: string): Promise<{ id: string; status: number }> {
  return request.post('/auth/addTodo', qs.stringify({ title: title }), {
    headers: { Authorization: ` ${token}` }
  })
}
//操作timeline
export function updateTimelineAPI(info: Timeline) {
  return request.post('/auth/updateTimeline', qs.stringify(info), {
    headers: { Authorization: ` ${token}` }
  })
}
export function removeTimelineAPI(id: string) {
  return request.post('/auth/removeTimeline', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addTimelineAPI(info: {
  title: string
  color: string
  time: string
}): Promise<addTimelineRes> {
  return request.post('/auth/addTimeline', qs.stringify(info), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addComment(comment: {
  content: string
  nickname: string
  website: string
  email: string
  parent_id: number
}) {
  return request.post('/record/addComment', qs.stringify(comment), {
    headers: { Authorization: ` ${token}` }
  })
}

export function addLabel(label_name: string) {
  return request.post('auth/addLabel', qs.stringify({ label_name }), {
    headers: { Authorization: ` ${token}` }
  })
}
