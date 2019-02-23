import React from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../redux/store'
import TodoListContainer from './containers/TodoListContainer'

export default () => (
  <Provider store={makeStore({ test: 'testee' })}>
    <TodoListContainer />
  </Provider>
)
