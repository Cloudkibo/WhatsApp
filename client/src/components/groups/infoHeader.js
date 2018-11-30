import React, { Component } from 'react'
import { Image, Reveal } from 'semantic-ui-react'
import { handleDate } from '../../utility/utils'

class InfoHeader extends Component {
  render () {
    return (
      <div className='m-widget5'>
        <div className='m-widget5__item'>
          <div className='m-widget5__pic' style={{width: '110px', cursor: 'pointer'}}>
            <Reveal animated='fade' style={{opacity: '1'}} onClick={() => { this.refs.selectFile.click() }}>
              <Reveal.Content visible className='group-icon'>
                <Image circular size='tiny' src={this.props.groupsInfo.iconURL && this.props.groupsInfo.iconURL !== ''
                  ? `/api/v1/groups/${this.props.groupsInfo.groupId}/icon`
                  : 'https://react.semantic-ui.com/images/wireframe/image.png'} style={{height: '100px', width: '100px'}} />
              </Reveal.Content>
              <Reveal.Content hidden className='group-icon'>
                <Image circular size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png'
                  style={{height: '100px', width: '100px'}} />
              </Reveal.Content>
              <input type='file' accept='image/*' onChange={this.props.handleImage} ref='selectFile' style={{display: 'none'}} />
            </Reveal>
          </div>
          <div className='m-widget5__content' style={{verticalAlign: 'middle'}}>
            <h4 className='m-widget5__title'>
              {this.props.groupsInfo.title}&nbsp;&nbsp;
              <i className='fa fa-pencil' style={{cursor: 'pointer'}} onClick={() => { this.props.showModal(true) }} />
            </h4>
            <span className='m-widget5__desc'>
              <b>Created At:</b> {handleDate(this.props.groupsInfo.createtime)}
            </span>
          </div>
          <div className='m-widget5__stats1' style={{width: '200px', verticalAlign: 'middle'}}>
            <center style={{cursor: 'pointer', marginTop: '-10px'}}>
              <span className='m-widget5__number'>
                {this.props.participants.length}
              </span>
              <br />
              <span className='m-widget5__sales'>
                Participants
              </span>
            </center>
          </div>
          <div className='m-widget5__stats1' style={{width: '200px', verticalAlign: 'middle'}}>
            <center style={{cursor: 'pointer', marginTop: '-10px'}}>
              <span className='m-widget5__number'>
                {this.props.participants.filter(item => item.admin).length}
              </span>
              <br />
              <span className='m-widget5__sales'>
                Admins
              </span>
            </center>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoHeader
