import React, { Component } from 'react'
import { Image, List, Icon } from 'semantic-ui-react'

class SessionsList extends Component {
  getLastChat = (messages) => {
    if (messages.length === 0) { return '' }
    let last = messages[messages.length - 1]
    if (last.type === 'text') {
      return last.messagePayload.body
    } else if (last.type === 'system') {
      return last.messagePayload.body
    } else {
      return 'Media Message'
    }
  }

  render () {
    return (
      <div className='m-portlet__body' style={{borderLeft: '1px solid rgb(144, 144, 144)', borderBottom: '1px solid rgb(144, 144, 144)'}}>
        <List selection animated divided size='large' style={{height: '515px', overflowY: 'scroll'}}>
          { (this.props.chats) && this.props.chats.map((item) => {
            return (
              <List.Item style={{padding: '15px'}} active onClick={() => { this.props.selectSession(item) }}>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                <List.Content>
                  <List.Header as='a'>{item.sessionIdentifier}</List.Header>
                  <List.Description style={{fontSize: 'smaller', paddingTop: '3px'}}>
                    <Icon name='checkmark' inverted color='blue' />
                    { this.getLastChat(item.messages)}
                  </List.Description>
                </List.Content>
              </List.Item>
            )
          }) }

        </List>
      </div>
    )
  }
}

export default SessionsList
