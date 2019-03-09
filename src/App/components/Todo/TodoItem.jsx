import React, { useState } from 'react'
import { Item, Button, Grid, Accordion, Icon } from 'semantic-ui-react'
import TodoMenu from './TodoMenu'

export default ({ data, history }) => {
  const [activeIndex, changeActiveIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const handleDoneClick = () => setIsDone(true)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    changeActiveIndex(newIndex)
  }

  return (
    <Item>
      <Item.Content verticalAlign="middle">
        <Grid divided>
          <Grid.Row>
            <Grid.Column
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              {!history && (
                <Button
                  size="mini"
                  circular
                  basic={!isDone || data.status === 'completed'}
                  color={isDone || data.status === 'completed' ? 'teal' : 'grey'}
                  onClick={handleDoneClick}
                  animated="fade"
                />
              )}
              <Accordion fluid style={{ margin: '0 10px 0 15px' }}>
                <Accordion.Title active={activeIndex !== 0} index={0} onClick={handleClick}>
                  {data.notes && <Icon name="dropdown" />}
                  {data.title}
                </Accordion.Title>
                {data.notes && (
                  <Accordion.Content active={activeIndex !== 0}>
                    <p>{data.notes}</p>
                  </Accordion.Content>
                )}
              </Accordion>
              <TodoMenu />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Item.Content>
    </Item>
  )
}
