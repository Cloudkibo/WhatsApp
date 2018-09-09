import React, { Component } from 'react'

class File extends Component {
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
              <a href={this.props.link} target='_blank'>
                <h6 style={{marginTop: '10px'}}><i className='fa fa-file-text-o' /><strong> {this.props.fileName}</strong></h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default File
