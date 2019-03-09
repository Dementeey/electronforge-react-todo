import React, { useState } from 'react'
import Login from './components/Login'
import AppContent from './components/AppContent'
import getParseUser from '../utils/getParseUser'
import initDefaultAxios from '../helpers/initDefaultAxios'

export default () => {
  const userInfo = getParseUser('user')
  const [isLogin, setLogin] = useState(false)

  if (userInfo) {
    initDefaultAxios(userInfo)
  }

  return isLogin ? <AppContent setLogin={setLogin} /> : <Login setLogin={setLogin} />
}
