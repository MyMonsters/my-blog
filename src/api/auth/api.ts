import request from '@/request'
import qs from 'qs'
import localCache from '@/utils/cache'
// import { useAuthStore } from '@/store/modules/auth'
// const authStore = useAuthStore()

//操作article
//登录
export function accountLoginAPI(account: Account): Promise<LoginAPIRes> {
  return request.post('/log/login', qs.stringify(account))
}
//获取登录二维码
export function getQrcodeImgAPI(uuid: string): Promise<QrcodeImgAPIRes> {
  return request.get('/log/getQrcodeImg/' + uuid)
}
//验证登录码
export function verifyQrcodeAPI(uuid: string, code: string): Promise<QrcodeVerifyAPIRes> {
  return request.post('/log/verifyQrcode/' + uuid, qs.stringify({ code: code }))
}
//查看二维码登录状态
export function checkQrcodeStatusAPI(uuid: string): Promise<QrcodeCheckAPIRes> {
  return request.get('/log/checkQrcodeStatus/' + uuid)
}
//删除文章
export function removeArticle(id: string): Promise<RemoveArticleRes> {
  const token = localCache.getCache('token')
  return request.post('/auth/removeArticle', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addArticle(article: Article): Promise<AddArticleRes> {
  const token = localCache.getCache('token')
  return request.post('/auth/addArticle', qs.stringify(article), {
    headers: { Authorization: ` ${token}` }
  })
}
export function updateArticle(article: Article) {
  const token = localCache.getCache('token')
  return request.post('/auth/updateArticle', qs.stringify(article), {
    headers: { Authorization: ` ${token}` }
  })
}

export function updateAvatarImg(formData: FormData) {
  const token = localCache.getCache('token')
  console.log(formData)
  return request.post('/cos/uploadAvatarImg', formData, {
    headers: { Authorization: ` ${token}` }
  })
}
export function updateArticleImg(formData: FormData) {
  const token = localCache.getCache('token')
  return request.post('/cos/uploadArticleImg', formData, {
    headers: { Authorization: ` ${token}` }
  })
}
//操作Todolist
export function doneTodoAPI(id: string) {
  const token = localCache.getCache('token')
  return request.post('/auth/doneTodo', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function removeTodoAPI(id: string): Promise<{ status: number }> {
  const token = localCache.getCache('token')
  return request.post('/auth/removeTodo', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addTodoAPI(title: string): Promise<{ id: string; status: number }> {
  const token = localCache.getCache('token')
  return request.post('/auth/addTodo', qs.stringify({ title: title }), {
    headers: { Authorization: ` ${token}` }
  })
}
//操作timeline
export function updateTimelineAPI(info: Timeline) {
  const token = localCache.getCache('token')
  return request.post('/auth/updateTimeline', qs.stringify(info), {
    headers: { Authorization: ` ${token}` }
  })
}
export function removeTimelineAPI(id: string) {
  const token = localCache.getCache('token')
  return request.post('/auth/removeTimeline', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addTimelineAPI(info: {
  title: string
  color: string
  time: string
}): Promise<addTimelineRes> {
  const token = localCache.getCache('token')
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
  const token = localCache.getCache('token')
  return request.post('/record/addComment', qs.stringify(comment), {
    headers: { Authorization: ` ${token}` }
  })
}

export function addLabel(label_name: string) {
  const token = localCache.getCache('token')
  return request.post('auth/addLabel', qs.stringify({ label_name }), {
    headers: { Authorization: ` ${token}` }
  })
}

//操作project
export function updateProjectAPI(info: Project) {
  const token = localCache.getCache('token')
  return request.post('/auth/updateProject', qs.stringify(info), {
    headers: { Authorization: ` ${token}` }
  })
}
export function removeProjectAPI(id: string) {
  const token = localCache.getCache('token')
  return request.post('/auth/removeProject', qs.stringify({ id: id }), {
    headers: { Authorization: ` ${token}` }
  })
}
export function addProjectAPI(info: {
  link: string
  desc: string
  imgUrl: string
}): Promise<addProjectRes> {
  const token = localCache.getCache('token')
  return request.post('/auth/addProject', qs.stringify(info), {
    headers: { Authorization: ` ${token}` }
  })
}
export function updateAboutAPI(info: { type: string; intro: string; theme: string }) {
  const token = localCache.getCache('token')
  return request.post('/auth/updateAbout', qs.stringify(info), {
    headers: { Authorization: token }
  })
}
