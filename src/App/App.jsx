import React from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../redux/store'
import TodoListContainer from './containers/TodoListContainer'
// import ConnectToGApi from './components/ConnectToGApi'

export default () => (
  <Provider store={makeStore()}>
    <div>Account Name: {}</div>

    {/* <ConnectToGApi /> */}
    <TodoListContainer />
  </Provider>
)
