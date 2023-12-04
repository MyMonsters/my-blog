interface Timeline {
  id: number
  time: string
  title: string
  color: string
}
interface Article {
  id: number
  content: string
  title: string
  category: string
  type: number
  description: string
  image: string
  create_time: string
}
interface Todo {
  id: string
  isdone: number
  title: string
}
interface Comment {
  id: number
  content: string
  nickname: string
  website: string
  parent_id: number
  iscomment: boolean
  replyto: string
  create_time: string
  article_id: number
  image: string
}
interface Label {
  label_id: number
  label_name: string
}
interface Project {
  project_id: number
  desc: string
  link: string
  imgUrl: string
}
interface About {
  type: string
  intro: string
  theme: string
}
interface QrcodeImgAPIRes {
  url: string
}
interface QrcodeVerifyAPIRes {
  msg: string
}
interface QrcodeCheckAPIRes {
  status: string
  token?: string
}
