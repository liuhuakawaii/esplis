/**
 * 前端封装 curl 方法
 */

import axios from "axios"
import md5 from "md5"
import { ElMessage } from "element-plus"

const curl = ({
  url,//请求地址
  method = 'post',//请求方法
  headers = {},//请求头
  query = {},//url query
  body = {},//post body
  responseType = 'json',//response data type
  timeout = 60000,
  errorMessage = '网络异常',
}) => {
  // 接口签名处理(让接口变动态)
  const signKey = 'dbaskb45s3afaf8v2a0asd1a'
  const st = Date.now()

  // 构造请求参数
  const ajaxSettings = {
    url,
    method,
    params: query,
    data: body,
    responseType,
    timeout,
    headers: {
      ...headers,
      s_t: st,
      s_sign: md5(`${signKey}_${st}`)
    }
  }

  return axios.request(ajaxSettings).then(response => {
    const resData = response.data || {}

    //后端返回 API 格式
    const { success } = resData
    if (!success) {
      const { code, message } = resData
      //业务错误
      switch (code) {
        case 445:
          ElMessage.error('请求不合法')
          break
        case 442:
          ElMessage.error('请求参数异常')
          break
        case 50000:
          ElMessage.error(message)
          break
        default:
          ElMessage.error(message)
          break
      }
      console.error(message)
      return Promise.resolve({ success, code, message })
    }

    const { data, metadata } = resData
    return Promise.resolve({ success, data, metadata })

  }).catch(error => {
    // 其他错误
    const { message } = error
    if (message.match(/timeout/i)) {
      return Promise.resolve({
        message: 'Request timeout',
        code: 504
      })
    }
    return Promise.resolve(error)
  })
}

export default curl