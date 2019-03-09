import React, { useState } from 'react'
import { Segment, Container, Header, Item, Input, Tab, Dropdown } from 'semantic-ui-react'
import TodoItem from './TodoItem'

const todoData = [
  {
    id: 1,
    label: 'text1',
    description: 'descasdasdasdasdasdasdasdasdasdasd1',
    isDone: false,
  },
  {
    id: 2,
    label: 'text2',
    description: 'descasdasdasdasdasdasdasdasdasdasd2',
    isDone: false,
  },
  {
    id: 3,
    label: 'text3',
    description: 'descasdasdasdasdasdasdasdasdasdasd3',
    isDone: false,
  },
]

export default () => {
  const [tasks, setTasks] = useState([])
  const [historyTasks, setHistoryTasks] = useState([])

  /**
   * todo:
   * First params @data object, default = {}
   * Second params @history bool, default = false
   * Return => react node
   */

  const todo = (data, history = false) => (
    <Container fluid>
      <Segment>
        <Header
          as="h2"
          size="small"
          color="grey"
          icon={history ? 'history' : 'tasks'}
          content={history ? 'History' : 'Todo'}
        />
        <Item.Group divided>
          {todoData.map(item => (
            <TodoItem data={item} key={item.id} />
          ))}
        </Item.Group>
      </Segment>

      {!history && <Input fluid action={{ color: 'teal', icon: 'add' }} placeholder="add..." />}
    </Container>
  )

  const panes = [
    { menuItem: 'Todo', render: () => <Tab.Pane>{todo(tasks)}</Tab.Pane> },
    { menuItem: 'History', render: () => <Tab.Pane>{todo(historyTasks, true)}</Tab.Pane> },
  ]

  return (
    <div
      style={{
        display: 'flex',
        background: 'linear-gradient(to top, #6435c9,#f7a670, rgb(241, 218, 54), #41e3ff)',
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
        <Tab panes={panes} />
      </div>
    </div>
  )
}
