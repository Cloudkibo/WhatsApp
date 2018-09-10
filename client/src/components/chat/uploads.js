import React, { Component } from 'react'

class Uploads extends Component {
  showFiles = () => {
    this.props.attachments.map(attachment => {
      return (
        <div>
          { attachment.uploaded
            ? <div style={{wordWrap: 'break-word', overFlow: 'auto', minHeight: '50px'}}>
              <span onClick={attachment.removeAttachment} style={{cursor: 'pointer', float: 'right'}} className='fa-stack'>
                <i style={{color: '#ccc'}} className='fa fa-times fa-stack-1x fa-inverse' />
              </span>
              <div><i className='fa fa-file-text-o' /> {attachment.attachment.name}</div>
            </div>
            : <div style={{wordWrap: 'break-word', color: 'red', fontSize: 'small'}}>{attachment.uploadDescription}</div>
          }
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        { this.props.uploaded
          ? <div style={{wordWrap: 'break-word', overFlow: 'auto', minHeight: '50px'}}>
            <span onClick={this.props.removeAttachment} style={{cursor: 'pointer', float: 'right'}} className='fa-stack'>
              <i style={{color: '#ccc'}} className='fa fa-times fa-stack-1x fa-inverse' />
            </span>
            <div><i className='fa fa-file-text-o' /> {this.props.attachment.name}</div>
            <div style={{wordWrap: 'break-word', color: 'red', fontSize: 'small'}}>{this.props.removeFileDescription}</div>
          </div>
          : <div style={{wordWrap: 'break-word', color: 'red', fontSize: 'small'}}>{this.props.uploadDescription}</div>
        }
      </div>
    )
  }
}

export default Uploads
