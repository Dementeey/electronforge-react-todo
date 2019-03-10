import React, { useState } from 'react'
import Login from './components/Login'
import AppContent from './components/AppContent'
import getParseUser from '../utils/getParseUser'
import initAxiosDefaults from '../helpers/initAxiosDefaults'

export default () => {
  const userInfo = getParseUser('user')
  const [isLogin, setLogin] = useState(false)

  if (userInfo) {
    initAxiosDefaults(userInfo)
    if (userInfo.accessToken && !isLogin) {
      setLogin(true)
    }
  }

  return isLogin ? <AppContent setLogin={setLogin} /> : <Login setLogin={setLogin} />
}
