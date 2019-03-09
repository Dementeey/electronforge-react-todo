import React, { useState, useEffect } from 'react'
import { Segment, Container, Item, Input, Tab, Menu, Label, Icon } from 'semantic-ui-react'
import TodoItem from './TodoItem'
import { getTasks } from '../../../helpers/getTasks'

export default ({ currentList }) => {
  const initialStateTodoTask = {
    etag: '',
    items: [],
    kind: '',
  }

  const [tasks, setTasks] = useState(initialStateTodoTask)

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
  }, [currentList])

  /**
   * todo:
   * First params @data object, default = {}
   * Second params @history bool, default = false
   * Return => react node
   */

  const todo = (data, history = false) => (
    <Container fluid>
      <Segment style={{ overflowY: 'auto', height: '50vh' }}>
        <Item.Group divided>
          {data.map(item => (
            <TodoItem data={item} history={history} key={item.id} />
          ))}
        </Item.Group>
      </Segment>

      {!history && <Input fluid action={{ color: 'teal', icon: 'add' }} placeholder="add..." />}
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
        <Tab menu={{ pointing: true }} grid={{ paneWidth: 12, tabWidth: 6 }} panes={panes} />
      </div>
    </div>
  )
}
