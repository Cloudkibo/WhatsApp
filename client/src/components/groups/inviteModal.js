import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

class InviteModal extends Component {
  render () {
    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.handleClose}
        closeIcon style={{height: 'maxContent', position: 'relative', overflow: 'visible'}}>
        <Header content={this.props.heading} />
        <Modal.Content>
          <Modal.Description>
            <p>{this.props.inviteLink}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.props.handleClose}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default InviteModal
