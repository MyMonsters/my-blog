import Axios from 'axios'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress'


const axios = Axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    NProgress.start()
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    NProgress.done()
    return response.data
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      //   ElMessage.error(`Code: ${code}, Message: ${msg}`)
      message.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      //   ElMessage.error(`${error}`)
      message.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios
