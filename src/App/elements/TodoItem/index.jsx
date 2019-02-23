import React from 'react'
import { Item, Button, Grid } from 'semantic-ui-react'
import TodoMenu from '../TodoMenu'

export default ({ data }) => (
  <Item>
    <Item.Content verticalAlign="middle">
      <Grid divided>
        <Grid.Row>
          <Grid.Column>
            <Item.Extra>
              <Button circular basic color="green" icon="check" />
            </Item.Extra>
            {data.label}
            <Item.Extra>
              <TodoMenu />
            </Item.Extra>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Item.Content>
  </Item>
)
