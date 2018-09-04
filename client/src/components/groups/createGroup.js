import React, { Component } from 'react'
import { Button, Header, Image, Modal, Input, Icon } from 'semantic-ui-react'
import PortletHead from '../themeComponents/portletHead'

class CreateGroup extends Component {
  render () {
    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.handleClose}
        closeIcon style={{height: 'maxContent', position: 'relative', overflow: 'visible'}}>
        <Header content='Create Group' />
        <Modal.Content>
          <Modal.Description>
            <label>Group Title:</label><br />
            <input className='form-control' placeholder='Enter group title here...' ref='title' /><br /><br /><br />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => this.props.onCreate(this.refs.title.value)}>
            <Icon name='checkmark' /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreateGroup
