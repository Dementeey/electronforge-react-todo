import React, { Fragment, useState, useEffect } from 'react'
import TodoList from './components/Todo/TodoList'
import Header from './components/Header'
import Login from './components/Login'

export default () => {
  const [isLogin, setLogin] = useState(false)
  const [user, setUser] = useState(JSON.parse(global.localStorage.getItem('user')))

  useEffect(() => {
    const userInfo = JSON.parse(global.localStorage.getItem('user'))
    if (userInfo.accessToken) {
      setLogin(true)
    }

    setUser(userInfo)
  }, [])

  return (
    <Fragment>
      <Header name={user.name} picture={user.picture} email={user.email} />
      <hr />

      {isLogin ? <TodoList /> : <Login setLogin={setLogin} />}
    </Fragment>
  )
}
