import axios from 'axios'
import logoutApp from '../utils/logoutApp'

// class Api {
//   constructor() {
//     this.accessToken = global.localStorage.user
//       ? JSON.parse(global.localStorage.user).accessToken
//       : null
//   }

//   /**
//    * Wrapper by axios post
//    * @param {* string} url = axios url
//    * @param {* object} options = axios config
//    */

//   get(url, options) {
//     // const approvalCode = [200, 201, 304]
//     const wrapOptions = {
//       // ...options,
//       headers: {
//         Authorization: `Bearer ${this.accessToken}`,
//       },
//     }

//     const response = axios.get(url, wrapOptions)

//     // if (!approvalCode.includes(response.code)) {
//     //   return this.getNewToken()
//     // }

//     return response
//   }

//   post(url, data, options) {
//     // const approvalCode = [200, 201, 304]
//     const wrapOptions = {
//       // ...options,
//       headers: {
//         Authorization: `Bearer ${this.accessToken}`,
//       },
//     }

//     const response = axios.post(this.url, data, wrapOptions)

//     // if (!approvalCode.includes(response.code)) {
//     //   return this.getNewToken()
//     // }

//     return response
//   }
// }

// export const api = new Api()

export default (data) => {
  const { tokenType = '', accessToken = '', refreshToken = '' } = data
  const logoutCode = [401, 403]

  axios.defaults.headers.common.Authorization = `${tokenType} ${accessToken}`
  axios.defaults.headers.common.refresh_token = `${tokenType} ${refreshToken}`

  axios.interceptors.response.use(
    response => response,
    (error) => {
      if (logoutCode.includes(error.response.status)) {
        logoutApp()
      }
      return Promise.reject(error)
    },
  )
}
