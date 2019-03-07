import React from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'

export default () => {
  const options = [
    { key: 'edit', text: 'Edit', icon: 'edit outline' },
    { key: 'delete', text: 'Delete', icon: 'trash alternate outline' },
  ]

  return (
    <Dropdown
      trigger={<Icon color="grey" name="ellipsis vertical" />}
      options={options}
      pointing="top left"
      icon={null}
    />
  )
}
