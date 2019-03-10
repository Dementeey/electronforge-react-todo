import React from 'react'
import { Icon, Modal } from 'semantic-ui-react'

export default () => (
  <div style={{ position: 'absolute', bottom: 15, right: 15, cursor: 'pointer' }}>
    <Modal
      closeIcon
      size="tiny"
      // style={{ minHeight: '50vh' }}
      trigger={<Icon color="blue" size="large" name="info circle" />}
    >
      <Modal.Header>About &quot;ToDo-Desktop&quot;</Modal.Header>

      <Modal.Content>
        <p>
          The Google Tasks API lets you search, read, and update Google Tasks content and metadata.
        </p>

        <br />
        <br />
        <br />

        <p>
          <i>Version</i>: <b>0.1.0</b>
        </p>
      </Modal.Content>
    </Modal>
  </div>
)
