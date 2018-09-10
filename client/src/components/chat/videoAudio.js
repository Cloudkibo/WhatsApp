import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class VideoAudio extends Component {
  render () {
    return (
      <div className={`m-messenger__message m-messenger__message--${this.props.class}`} style={{display: 'block', clear: 'both'}}>
        {this.props.class === 'in' &&
          <div className='m-messenger__message-pic'>
            <img src='assets/app/media/img//users/user3.jpg' alt='' />
          </div>
        }
        <div className='m-messenger__message-body'>
          <div className='m-messenger__message-arrow' />
          <div className='m-messenger__message-content'>
            <div className='m-messenger__message-text'>
              <ReactPlayer url={this.props.url} controls width='512px' height={this.props.type === 'video' ? '288px' : '50px'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoAudio
