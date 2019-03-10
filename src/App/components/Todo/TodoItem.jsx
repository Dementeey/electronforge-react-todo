import React, { useState } from 'react'
import { Item, Button, Grid, Accordion, Icon, Label } from 'semantic-ui-react'
import { completeTask } from '../../../helpers/apiTasks'

// import TodoMenu from './TodoMenu'

export default ({ data, history, currentList, setLoadNewData }) => {
  const [activeIndex, changeActiveIndex] = useState(0)
  const [isCompleted, setComplete] = useState(false)

  const handleCompleteTask = async () => {
    const { id } = data
    const body = {
      status: 'completed',
      updated: new Date().toISOString(),
      id,
    }

    setComplete(true)
    await completeTask(currentList, id, JSON.stringify(body))

    setLoadNewData(true)
    setLoadNewData(false)
  }

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    changeActiveIndex(newIndex)
  }

  const isRenderAccordionContent = () => data.notes || data.due

  return (
    <Item>
      <Item.Content verticalAlign="middle">
        <Grid divided>
          <Grid.Row>
            <Grid.Column
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              {!history && isCompleted ? (
                <Icon name="circle thin" color="teal" />
              ) : (
                <Icon
                  name="circle outline"
                  disabled={isCompleted}
                  onClick={handleCompleteTask}
                  style={{ cursor: 'pointer' }}
                />
              )}

              <Accordion fluid style={{ margin: '0 10px 0 15px' }}>
                <Accordion.Title active={activeIndex !== 0} index={0} onClick={handleClick}>
                  {isRenderAccordionContent() && <Icon name="dropdown" />}
                  {data.title}
                </Accordion.Title>

                {isRenderAccordionContent() && (
                  <Accordion.Content active={activeIndex !== 0}>
                    <p>{data.notes}</p>
                    {data.due && (
                      <Label color="violet">
                        <Icon name="calendar check outline" />
                        {new Date(data.due).toDateString()}
                      </Label>
                    )}
                  </Accordion.Content>
                )}
              </Accordion>
              {/* <TodoMenu /> */}
              {history ? (
                <Icon style={{ cursor: 'pointer' }} color="grey" name="trash" title="Coming soon" />
              ) : (
                <Icon style={{ cursor: 'pointer' }} color="grey" name="edit" title="Coming soon" />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Item.Content>
    </Item>
  )
}
