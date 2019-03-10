import React, { Fragment, useState, useRef } from 'react'
import { Header, Image, Placeholder, Dropdown, Button, Input } from 'semantic-ui-react'
import logoutApp from '../../../utils/logoutApp'
import { insertList } from '../../../helpers/apiTasks'

export default ({ name, email, options, picture, currentList, setCurrentList }) => {
  const inputRef = useRef(null)
  const [bodyList, setBodyList] = useState({ title: '' })
  const [isLoadingList, setLoadingList] = useState(false)
  const [toggleInput, setToggleInput] = useState(false)

  const handleChangeNewTask = (e, { value }) => {
    setBodyList({
      title: value,
    })
  }

  const handlerAddNewList = async () => {
    if (!bodyList.title) {
      inputRef.current.focus()
      return
    }

    setLoadingList(true)
    const { id } = await insertList(JSON.stringify(bodyList))
    setLoadingList(false)
    setBodyList({ title: '' })
    setToggleInput(!toggleInput)
    setCurrentList(id)
  }

  return (
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
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: 300,
            justifyContent: 'space-between',
          }}
        >
          {toggleInput && (
            <Input
              ref={inputRef}
              disabled={isLoadingList}
              placeholder="Create new list"
              onChange={handleChangeNewTask}
              value={bodyList.title || ''}
              onKeyPress={({ charCode }) => charCode === 13 && handlerAddNewList()}
              action={{ color: 'teal', icon: 'add', onClick: handlerAddNewList }}
              style={{
                position: 'absolute',
                top: 45,
                left: 0,
                zIndex: 10,
                width: 'calc(300px - 0.25em)',
              }}
            />
          )}
          <Dropdown
            style={{ fontSize: 14, width: 250 }}
            loading={isLoadingList}
            title="Task list"
            selection
            search
            options={options}
            value={currentList || (options.length > 1 && options[0].value)}
            onChange={(e, { value }) => setCurrentList(value)}
          />
          <Button
            basic
            title="Create new list"
            icon={toggleInput ? 'close' : 'add'}
            onClick={() => setToggleInput(!toggleInput)}
          />
        </div>
      </div>
    </Header>
  )
}
