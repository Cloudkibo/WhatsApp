import React, { Component } from 'react'
import { Image, Reveal } from 'semantic-ui-react'

class InfoHeader extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col-xl-4'>
          <Reveal animated='fade' style={{opacity: '1'}} onClick={() => { this.refs.selectFile.click() }}>
            <Reveal.Content visible>
              <Image circular size='tiny' src='icons/users.jpg' style={{height: '80px', width: '80px'}} />
            </Reveal.Content>
            <Reveal.Content hidden className='group-icon'>
              <Image circular size='tiny' src='icons/users.jpg' style={{height: '80px', width: '80px'}} />
            </Reveal.Content>
            <input type='file' accept='image/*' onChange={this.props.handleImage} ref='selectFile' style={{display: 'none'}} />
          </Reveal>
          <div style={{marginTop: -65 + 'px', marginLeft: 100 + 'px'}}>
            <h3>{(this.props.groupName) ? this.props.groupName : ''}</h3>
            <p><strong>Created At: </strong>{(this.props.createdAt) ? this.props.createdAt : ''}</p>
          </div>
        </div>
        <div className='col-xl-4'>
          <div style={{fontSize: 20 + 'px', textAlign: 'center', float: 'right'}}>
            {(this.props.participants) ? this.props.participants : ''}<br />
            Participants
          </div>
        </div>
        <div className='col-xl-4'>
          <div style={{fontSize: 20 + 'px', textAlign: 'center'}}>
            {(this.props.admins) ? this.props.admins : ''}<br />
            Admins
          </div>
        </div>
      </div>

    )
  }
}

export default InfoHeader
