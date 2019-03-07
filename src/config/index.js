import axios from 'axios'

export const globalConsts = {
  GOOGLE_TOKEN_URL: '/oauth2/v4/token',
  GOOGLE_PROFILE_URL: '/userinfo/v2/me',
  GOOGLE_REDIRECT_URI: 'http://127.0.0.1:80',
  GOOGLE_CLIENT_SECRET: '1eXu1EtaZrcD57jUI3L2CZeF',
  GOOGLE_BASE_API_URL: 'https://www.googleapis.com',
  GOOGLE_API_KEY: 'AIzaSyCI4zi-hEMBJJjSigw-li0R2XDanDHo0bw',
  GOOGLE_AUTHORIZATION_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
  GOOGLE_CLIENT_ID: '233263060890-pksbnugsapeu5rnn7vdvqh5htdohq4c8.apps.googleusercontent.com',
  TASKS: {
    LISTS: '/tasks/v1/users/@me/lists',
  },
}

axios.defaults.baseURL = globalConsts.GOOGLE_BASE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
