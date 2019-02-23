import React from 'react'
import { Segment, Container, Header, Item } from 'semantic-ui-react'
import TodoItem from '../TodoItem'

const todoData = [
  {
    id: 1,
    label: 'text1',
    isDone: false,
  },
  {
    id: 2,
    label: 'text2',
    isDone: false,
  },
  {
    id: 3,
    label: 'text3',
    isDone: false,
  },
]

export default () => (
  <div
    style={{
      width: '90vw',
      maxWidth: '800px',
      minWidth: '400px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <Container fluid>
      <Segment>
        <Header as="h2" icon="tasks" size="small" color="grey" content="Todo App" />
        <Item.Group divided>
          {todoData.map(item => (
            <TodoItem data={item} key={item.id} />
          ))}
        </Item.Group>

        {/* input  */}
      </Segment>
    </Container>
  </div>
)
