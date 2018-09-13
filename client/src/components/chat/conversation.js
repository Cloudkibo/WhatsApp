import React, { Component } from 'react'
import Text from './text'
import Location from './location'
import VideoAudio from './videoAudio'
import ImageItem from './image'
import File from './file'
class Conversation extends Component {
  getChatComponent = (message) => {
    const classType = (message.to) ? 'out' : 'in'
    if (message.type === 'text') {
      return <Text class={classType} text={message.messagePayload.body} />
    }
    if (message.type === 'location') {
      return <Location class={classType} location={message.messagePayload} />
    }
    if (message.type === 'image') {
      return <ImageItem class={classType} src={`/api/v1/media/${message.messagePayload.id}`} text={message.messagePayload.caption} />
    }
    if (message.type === 'video') {
      return <VideoAudio class={classType} url={`/api/v1/media/${message.messagePayload.id}`} type='video' />
    }
    if (message.type === 'audio') {
      return <VideoAudio class={classType} url={`/api/v1/media/${message.messagePayload.id}`} type='audio' />
    }
    if (message.type === 'voice') {
      return <VideoAudio class={classType} url={`/api/v1/media/${message.messagePayload.id}`} type='audio' />
    }
    if (message.type === 'document') {
      return <File class={classType} link={`/api/v1/media/${message.messagePayload.id}`} fileName={message.messagePayload.caption} />
    }
    /**
     * <VideoAudio class='out' url='https://www.youtube.com/watch?v=ysz5S6PUM-U' type='video' />
       <VideoAudio class='in' url='http://www.largesound.com/ashborytour/sound/brobob.mp3' type='audio' />
       <ImageItem class='out' src='https://staging.kibopush.com/api/broadcasts/download/f0cc6622f3b20189820335.jpg' text='Yes sure.' />
       <File class='in' fileName='file.csv' link='' />
    */
  }
  /* {(this.props.chats) && this.props.chats.map((item) => {
                  return this.getChatComponent(item)
                })} */
  render () {
    return (
      <div style={{height: '506px', overflowY: 'scroll'}}>
        <div className='m-quick-sidebar__content'>
          <div className='tab-content'>
            <div className='tab-pane active m-scrollable' id='m_quick_sidebar_tabs_messenger' role='tabpanel'>
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <div className='m-messenger__messages' style={{padding: '10px'}}>

                  {(this.props.chats) && this.props.chats.map((item) => this.getChatComponent(item))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Conversation
