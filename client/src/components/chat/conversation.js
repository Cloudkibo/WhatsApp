import React, { Component } from 'react'
import Text from './text'
import VideoAudio from './videoAudio'
import ImageItem from './image'
import File from './file'
class Conversation extends Component {
  render () {
    return (
      <div style={{height: '506px', overflowY: 'scroll'}}>
        <div className='m-quick-sidebar__content'>
          <div className='tab-content'>
            <div className='tab-pane active m-scrollable' id='m_quick_sidebar_tabs_messenger' role='tabpanel'>
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <div className='m-messenger__messages' style={{padding: '10px'}}>
                  <Text class='in' text='Hi. How are you?' />
                  <VideoAudio class='out' url='https://www.youtube.com/watch?v=ysz5S6PUM-U' type='video' />
                  <VideoAudio class='in' url='http://www.largesound.com/ashborytour/sound/brobob.mp3' type='audio' />
                  <ImageItem class='out' src='https://staging.kibopush.com/api/broadcasts/download/f0cc6622f3b20189820335.jpg' text='Yes sure.' />
                  <div className='m-messenger__datetime'>
                    2:30PM
                  </div>
                  <File class='in' fileName='file.csv' link='' />
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
