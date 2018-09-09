import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'

class ImageItem extends Component {
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
              {this.props.text}
              <Image src={this.props.src} size='medium' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageItem
