import React, { useState, useEffect, useRef } from 'react'
import { Segment, Container, Item, Input, Tab, Menu, Label, Icon } from 'semantic-ui-react'
import TodoItem from './TodoItem'
import { getTasks, insertTask } from '../../../helpers/apiTasks'

export default ({ currentList }) => {
  const initialStateTodoTask = {
    etag: '',
    items: [],
    kind: '',
  }

  const inputRef = useRef(null)
  const [tasks, setTasks] = useState(initialStateTodoTask)
  const [isLoadNewData, setLoadNewData] = useState(false)
  const [bodyTitleTask, setBodyTitleTask] = useState({ title: '' })

  useEffect(() => {
    if (currentList) {
      getTasks(currentList).then((data) => {
        if (data.items) {
          setTasks(data)
        }
        if (!data.items) {
          setTasks(initialStateTodoTask)
        }
      })
    }
  }, [currentList, isLoadNewData])

  const handleChangeNewTask = (e, { value }) => {
    setBodyTitleTask({
      title: value,
    })
  }

  const handleAddNewTask = async () => {
    if (!bodyTitleTask.title) {
      inputRef.current.focus()
      return
    }

    setLoadNewData(true)
    await insertTask(currentList, JSON.stringify(bodyTitleTask))
    setLoadNewData(false)
    setBodyTitleTask('')
  }

  const todo = (data = [], history = false) => (
    <Container fluid>
      <Segment loading={isLoadNewData} style={{ overflowY: 'auto', height: '50vh' }}>
        <Item.Group divided>
          {data.map(item => (
            <TodoItem data={item} history={history} key={item.id} />
          ))}
        </Item.Group>
      </Segment>

      {!history && (
        <Input
          fluid
          ref={inputRef}
          placeholder="add..."
          value={bodyTitleTask.title || ''}
          onChange={handleChangeNewTask}
          onKeyPress={({ charCode }) => charCode === 13 && handleAddNewTask()}
          action={{ color: 'teal', icon: 'add', onClick: handleAddNewTask }}
        />
      )}
    </Container>
  )

  const panes = [
    {
      menuItem: (
        <Menu.Item key="todo">
          <Icon name="tasks" />
          Todo
          <Label color="teal">
            {tasks.items.filter(item => item.status !== 'completed').length}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>{todo(tasks.items.filter(item => item.status !== 'completed'))}</Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item key="history">
          <Icon name="history" />
          History
          <Label>{tasks.items.filter(item => item.status === 'completed').length}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>{todo(tasks.items.filter(item => item.status === 'completed'), true)}</Tab.Pane>
      ),
    },
  ]

  console.log('============im========================')
  console.log(tasks.items)
  console.log('====================================')

  return (
    <div
      style={{
        display: 'flex',
        background: 'linear-gradient(to top, #340f56, #f0e0ff)',
        height: '100vh',
        margin: 0,
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '90vw',
          maxWidth: '600px',
          minWidth: '350px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Tab menu={{ pointing: true }} panes={panes} />
      </div>
    </div>
  )
}
