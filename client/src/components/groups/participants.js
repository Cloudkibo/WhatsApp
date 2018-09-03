import React, { Component } from 'react'
import { Image, Button, Label, Icon } from 'semantic-ui-react'

class ParticipantList extends Component {
  render () {
    return (

      <div style={{marginTop: 25 + 'px'}}>
        <hr />
        <div className='row' style={{marginBottom: 25 + 'px'}}>
          <div className='col-sm-4'>
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' style={{width: 60 + 'px', marginLeft: 5 + 'px'}} circular />
            <div style={{marginTop: -45 + 'px', marginLeft: 100 + 'px'}}>
              <Button>Add Participants</Button>
            </div>
          </div>
        </div>

        <hr />
        <div className='row' style={{marginBottom: 25 + 'px'}}>
          <div className='col-sm-4'>
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' style={{width: 60 + 'px', marginLeft: 5 + 'px'}} circular />
            <div style={{marginTop: -40 + 'px', marginLeft: 110 + 'px'}}>
              <p>Dayem Siddiqui</p>
            </div>
          </div>
          <div className='col-sm-4'>
            <div style={{marginTop: 18 + 'px', marginLeft: -25 + 'px'}}>
              <Label color='green' horizontal>
                Admin
              </Label>
            </div>
          </div>
          <div className='col-sm-2'>
            <div style={{marginTop: 15 + 'px', marginLeft: -150 + 'px'}}>
              <Button color='yellow' size='mini'>
                <Icon name='user times' />
                Dismiss As Admin
              </Button>
            </div>
          </div>
          <div className='col-sm-2'>
            <div style={{marginTop: 15 + 'px', marginLeft: -80 + 'px'}}>
              <Button color='red' size='mini'>
                <Icon name='trash' />
                Remove From Group
              </Button>
            </div>
          </div>
        </div>

        <hr />
        <div className='row' style={{marginBottom: 25 + 'px'}}>
          <div className='col-sm-4'>
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='mini' style={{width: 60 + 'px', marginLeft: 5 + 'px'}} circular />
            <div style={{marginTop: -40 + 'px', marginLeft: 110 + 'px'}}>
              <p>Dayem Siddiqui</p>
            </div>
          </div>
          <div className='col-sm-4'>
            <div style={{marginTop: 18 + 'px', marginLeft: -25 + 'px'}}>
              <Label color='green' horizontal>
                Admin
              </Label>
            </div>
          </div>
          <div className='col-sm-2'>
            <div style={{marginTop: 15 + 'px', marginLeft: -150 + 'px'}}>
              <Button color='green' size='mini'>
                <Icon name='user plus' />
                Make Admin
              </Button>
            </div>
          </div>
          <div className='col-sm-2'>
            <div style={{marginTop: 15 + 'px', marginLeft: -80 + 'px'}}>
              <Button color='red' size='mini'>
                <Icon name='trash' />
                Remove From Group
              </Button>
            </div>
          </div>
        </div>

        <hr />
      </div>

    )
  }
}

export default ParticipantList
