import React, { Component } from 'react'
import { Image, List, Icon } from 'semantic-ui-react'

class SessionsList extends Component {
  render () {
    return (
      <div className='m-portlet__body' style={{borderLeft: '1px solid rgb(144, 144, 144)', borderBottom: '1px solid rgb(144, 144, 144)'}}>
        <List selection animated divided size='large' style={{height: '515px', overflowY: 'scroll'}}>
          <List.Item style={{padding: '15px'}} active>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
            <List.Content>
              <List.Header as='a'>Anisha Chhatwani</List.Header>
              <List.Description style={{fontSize: 'smaller', paddingTop: '3px'}}>
                <Icon name='checkmark' inverted color='blue' />
                Last message
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item style={{padding: '15px'}}>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
            <List.Content>
              <List.Header as='a'>Anisha Chhatwani</List.Header>
              <List.Description style={{fontSize: 'smaller', paddingTop: '3px'}}>
                <Icon name='checkmark' inverted color='grey' />
                Last message
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item style={{padding: '15px'}}>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            <List.Content>
              <List.Header as='a'>Anisha Chhatwani</List.Header>
              <List.Description style={{fontSize: 'smaller', paddingTop: '3px'}}>
                Last message
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
    )
  }
}

export default SessionsList
