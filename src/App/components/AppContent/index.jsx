import React, { Fragment, useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import TodoList from '../Todo/TodoList'
import Header from '../Header'
import getParseUser from '../../../utils/getParseUser'
import { getTaskLists } from '../../../helpers/getTasks'
import { formatterListToDropdown } from '../../../utils/formattersToDropdown'

export default ({ setLogin }) => {
  const userInfo = getParseUser('user')
  const initialStateUser = {
    name: '',
    email: '',
    picture: '',
  }
  const initialStateTodoTask = {
    etag: '',
    items: [],
    kind: '',
  }
  const [user, setUser] = useState(initialStateUser)
  const [taskLists, setTaskLists] = useState(initialStateTodoTask)
  const [currentList, setCurrentList] = useState('')

  useEffect(() => {
    if (userInfo && userInfo.accessToken) {
      setLogin(true)
      setUser(userInfo)
    }

    getTaskLists().then((data) => {
      setCurrentList(data.items[0].id)
      setTaskLists(data)
    })
  }, [])

  const renderLoader = () => (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Loader style={{ margin: 'auto' }} size="large" active inline="centered" />
    </div>
  )

  const renderTasks = () => (
    <Fragment>
      <Header
        name={user.name}
        picture={user.picture}
        email={user.email}
        options={formatterListToDropdown(taskLists.items, setCurrentList)}
        setCurrentList={setCurrentList}
      />

      {currentList ? <TodoList currentList={currentList} /> : renderLoader()}
    </Fragment>
  )

  return taskLists.items.length ? renderTasks() : renderLoader()
}
