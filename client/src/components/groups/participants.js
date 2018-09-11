import React, { Component } from 'react'

class ParticipantList extends Component {
  render () {
    console.log('Props From Participants ', this.props)
    return (
      <div style={{borderTop: '.07rem dashed #ebedf2'}}><br />
        <div className='m-widget5'>
          {this.props.participants && this.props.participants.map((participant) => (
            <div className='m-widget5__item'>
              <div className='m-widget5__pic' style={{verticalAlign: 'middle'}}>
                <img className='m-widget7__img' alt='pic' src='icons/users.jpg' style={{height: '60px', borderRadius: '50%', width: '60px'}} />
              </div>
              <div className='m-widget5__content' style={{verticalAlign: 'middle'}}>
                <h4 className='m-widget5__title'>
                  {participant.name}&nbsp;&nbsp;&nbsp;
                  {participant.admin &&
                  <span style={{border: '1px solid #34bfa3', padding: '0px 5px', borderRadius: '10px', fontSize: '12px'}}>
                    <span className='m--font-success'>Admin</span>
                  </span>
                  }
                </h4>
                <p>{participant.phone}</p>
              </div>
              <div className='m-widget5__stats1' style={{width: '200px'}}>
                <center style={{cursor: 'pointer', marginTop: '-10px'}} onClick={() => { this.props.handleAdmin(participant) }}>
                  <span className='m-widget5__number'>
                    <i className={participant.admin ? 'fa fa-times-circle' : 'fa fa-user-secret'} style={{fontSize: '1.5rem'}} />
                  </span>
                  <br />
                  <span className='m-widget5__sales'>
                    {participant.admin ? 'Dismiss as Admin' : 'Make Group Admin'}
                  </span>
                </center>
              </div>
              <div className='m-widget5__stats1' style={{width: '200px'}}
                onClick={() => { this.props.deleteParticipants(this.props.groupsInfo.groupId, [participant.wa_id]) }}>
                <center style={{cursor: 'pointer', marginTop: '-10px'}}>
                  <span className='m-widget5__number'>
                    <i className='fa fa-trash' style={{fontSize: '1.5rem'}} />
                  </span>
                  <br />
                  <span className='m-widget5__sales'>
                    Remove
                  </span>
                </center>
              </div>
            </div>
          ))}

        </div>
      </div>

    )
  }
}

export default ParticipantList
