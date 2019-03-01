import React, { Fragment, useState } from 'react'
import TodoList from './components/TodoList'
import ConnectToGApi from './components/ConnectToGApi'

export default () => {
  const [isLogin, changeIsLogin] = useState(false)
  const handleClick = () => changeIsLogin(!isLogin)

  return (
    <Fragment>
      <div>Account Name: </div>
      <button onClick={handleClick}>logout</button>
      <hr />
      {isLogin ? <TodoList /> : <ConnectToGApi />}
    </Fragment>
  )
}
