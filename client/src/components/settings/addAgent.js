import React, { Component } from 'react'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'

class AddAgent extends Component {
  render () {
    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.handleClose}
        closeIcon style={{width: '500px', position: 'relative', overflow: 'visible'}}>
        <Header content={this.props.heading} />
        <Modal.Content>
          <Modal.Description>
            <label>Name:</label><br />
            <input className='form-control' required /><br />
            <label>Email:</label><br />
            <input type='email' required className='form-control' /><br /><br /><br />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green'>
            <Icon name='checkmark' /> Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default AddAgent
