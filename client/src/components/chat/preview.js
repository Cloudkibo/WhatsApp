import React, { Component } from 'react'
import { Button, Icon, Image } from 'semantic-ui-react'
import * as ChatUtility from './../../containers/chat/chat.utility'
class Preview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      caption: ''
    }
  }

  getPreviewURL = (mediaId, attachmentType) => {
    if (attachmentType.includes('image')) {
      return `/api/v1/media/${mediaId}`
    } else if (attachmentType === 'application/pdf') {
      return 'https://cdn.pixabay.com/photo/2014/04/03/00/40/document-309065_960_720.png'
    } else if (attachmentType.includes('audio')) {
      return 'https://png.icons8.com/material/1600/audio-file.png'
    }
  }

  updateCaption = (e) => {
    this.setState({caption: e.target.value})
  }

  sendAttachment = (e) => {
    let payload = ChatUtility.getMessagePayload(
      this.props.sessionId,
      this.props.attachmentType,
      {
        id: this.props.uploadedId,
        caption: this.state.caption
      }
    )
    this.props.sendMessage(payload)
    this.props.onClosePreview()
  }

  render () {
    console.log('Preview Props', this.props)
    return (
      <div style={{background: '#E4E4E4', height: '600px'}}>
        <div className='m-quick-sidebar__content'>
          <div className='tab-content'>
            <div className='tab-pane active m-scrollable' id='m_quick_sidebar_tabs_messenger' role='tabpanel'>
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <div className='m-messenger__messages' />
                <div style={{width: '100%', background: '#00CCA5', height: '50px', padding: '10px', color: 'white', verticalAlign: 'center'}}>
                  <Icon name='close' onClick={this.props.removeAttachment} />
                  <h4> Preview </h4>
                </div>
                <center style={{padding: '25px'}}>
                  <Image src={this.getPreviewURL(this.props.uploadedId, this.props.attachmentType)} style={{maxHeight: '300px'}} />
                  <input placeholder='Add a caption...' style={{'fontSize': '18px',
                    'margin': '15px',
                    'marginTop': '50px',
                    'background': '#E4E4E4',
                    'border': '0',
                    'borderBottom': 'solid #00CCA5 2px',
                    'color': 'grey',
                    'width': '80%',
                    'outline': 'none'
                  }}
                    value={this.state.caption}
                    onChange={this.updateCaption} />
                  <Button circular icon='send' size='large' color='green'
                    onClick={this.sendAttachment} />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Preview
