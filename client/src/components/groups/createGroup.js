import React, { Component } from 'react'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'

class CreateGroup extends Component {
  render () {
    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.handleClose}
        closeIcon style={{height: 'maxContent', position: 'relative', overflow: 'visible'}}>
        <Header content={this.props.heading} />
        <Modal.Content>
          <Modal.Description>
            <label>Group Title:</label><br />
            <input className='form-control' placeholder='Enter group title here...' ref='title' onChange={this.props.updateTitle} value={this.props.title} /><br /><br /><br />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => this.props.onCreate(this.refs.title.value)}>
            <Icon name='checkmark' /> {this.props.heading === 'Edit Group Title' ? 'Save' : 'Create'}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreateGroup
