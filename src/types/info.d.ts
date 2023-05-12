interface Timeline {
  id: number
  time: string
  title: string
  color: string
}
interface Article {
  content: string
  title: string
  category: string
  type: number
  description: string
  image: string
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
}
