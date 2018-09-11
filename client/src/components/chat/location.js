import React, { Component } from 'react'

class Location extends Component {
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
              <table style={{border: '1px solid #ccc', borderRadius: '15px', borderCollapse: 'separate', padding: '5px'}}>
                <tbody>
                  <tr><td>
                    <a href='https://www.google.com/maps/place/24.866835,67.025732' target='_blank'>
                      <img style={{width: '200px'}} src='https://maps.googleapis.com/maps/api/staticmap?center=24.866835,67.025732&zoom=13&scale=false&size=400x200&maptype=roadmap&format=png&key=AIzaSyDDTb4NWqigQmW_qCVmSAkmZIIs3tp1x8Q&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C24.866835,67.025732' />
                    </a>
                  </td></tr>
                  <tr><td><p style={{fontWeight: 'bold'}}>IBA city campus</p></td></tr>
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
