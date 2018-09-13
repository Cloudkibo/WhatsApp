import React, { Component } from 'react'

class Location extends Component {
  getMapURL = (longitude, latitude) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&scale=false&size=400x200&maptype=roadmap&format=png&key=AIzaSyDDTb4NWqigQmW_qCVmSAkmZIIs3tp1x8Q&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${latitude},${longitude}`
  }
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
            <div className='m-messenger__message-text'>
              <table style={{border: '1px solid #ccc', borderRadius: '15px', borderCollapse: 'separate', padding: '5px'}}>
                <tbody>
                  <tr><td>
                    <a href={`https://www.google.com/maps/place/${this.props.location.latitude},${this.props.location.longitude}`} target='_blank'>
                      <img style={{width: '200px'}}
                        src={this.getMapURL(this.props.location.longitude, this.props.location.latitude)} />
                    </a>
                  </td></tr>
                  <tr><td><p style={{fontWeight: 'bold'}}>{ this.props.location.address }</p></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Location
