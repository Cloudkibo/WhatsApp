import React, { Component } from 'react'
class Text extends Component {
  render () {
    return (
      <div className={`m-messenger__message m-messenger__message--${this.props.class}`} style={{display: 'block', clear: 'both'}}>
        {this.props.class === 'in' &&
          <div className='m-messenger__message-pic'>
            <img src='assets/app/media/img//users/user3.jpg' alt='' />
          </div>
        }
        <div className='m-messenger__message-body'>
          <div className='m-messenger__message-arrow' style={{color: '#F4F4F8'}} />
          <div className='m-messenger__message-content' style={{background: '#F4F4F8'}}>
            <div className='m-messenger__message-text' style={{color: '#7D7C86'}}>
              {this.props.text}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Text
