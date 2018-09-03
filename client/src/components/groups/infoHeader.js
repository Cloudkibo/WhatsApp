import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'

class InfoHeader extends Component {
  render () {
    return (

      <div className='row'>
        <div className='col-xl-4'>
          <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular />
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
