import React, { Fragment } from 'react'
import { Header, Image, Placeholder } from 'semantic-ui-react'

export default ({ picture, name, email }) => (
  <Header
    style={{
      margin: '10px 15px',
    }}
    as="h5"
  >
    {picture && name && email ? (
      <Fragment>
        <Image title={name} circular src={picture} /> {email}
      </Fragment>
    ) : (
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    )}
  </Header>
)
