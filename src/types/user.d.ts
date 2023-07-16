declare module 'md-editor-v3'
declare module 'lodash-es'
interface Account {
  username: string
  password: string
}
interface LoginAPIRes {
  code: number
  token: string
  message: string
}

interface AddArticleRes {
  id: string
}
interface RemoveArticleRes {
  status: number
}

interface addTimelineRes {
  id: string
}
interface addProjectRes {
  id: string
}
