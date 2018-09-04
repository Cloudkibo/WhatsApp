import React, { Component } from 'react'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'

class UpdateContact extends Component {
  render () {
    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.handleClose}
        closeIcon style={{height: 'maxContent', position: 'relative', overflow: 'visible'}}
        size='mini'>
        <Header content='Update Contact' />
        <Modal.Content>
          <Modal.Description>
            <label>Contact Name:</label><br />
            <input className='form-control' placeholder={this.props.selectedContact.name} ref='title' /><br /><br /><br />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => this.props.onUpdate(this.refs.title.value)}>
            <Icon name='checkmark' /> Update
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default UpdateContact
