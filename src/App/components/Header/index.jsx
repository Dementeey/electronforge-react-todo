import React, { Fragment } from 'react'
import { Header, Image, Placeholder, Dropdown, Button } from 'semantic-ui-react'
import logoutApp from '../../../utils/logoutApp'

export default ({ picture, name, email, options, setCurrentList }) => (
  <Header
    style={{
      margin: '10px 15px',
    }}
    as="h5"
  >
    <div style={{ display: 'flex', height: 40, width: '100%', justifyContent: 'space-between' }}>
      {picture && name && email ? (
        <Fragment>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown
              trigger={
                <Image style={{ height: 40, width: 40 }} title={name} circular src={picture} />
              }
              pointing="top left"
              icon={null}
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => logoutApp()} icon="sign-out" text="Sign Out" />
              </Dropdown.Menu>
            </Dropdown>
            <span style={{ marginLeft: 15 }}>{email}</span>
          </div>
        </Fragment>
      ) : (
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      )}
      <div>
        <Button basic title="Create new list" icon="add" />
        <Dropdown
          title="Task list"
          selection
          search
          options={options}
          defaultValue={options.length > 1 && options[0].value}
          onChange={(e, { value }) => setCurrentList(value)}
        />
      </div>
    </div>
  </Header>
)
