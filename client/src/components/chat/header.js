import React, { Component } from 'react'
import Avatar from 'react-avatar'
import { Dropdown, Icon } from 'semantic-ui-react'

class Header extends Component {
  render () {
    return (
      <div className='m-portlet__head' style={{background: '#ebedf2'}}>
        <div className='m-portlet__head-caption' style={{display: 'inline-flex', marginTop: '10px'}}>
          <Avatar name={this.props.name}
            round size='45' maxInitials='2' style={{marginTop: '10px', margin: 'auto', width: '60px'}} />
          <div className='m-portlet__head-title'>
            <h3 className='m-portlet__head-text'>
              {this.props.name}
              <br />
              <span style={{fontSize: 'small', fontWeight: 'lighter'}}>
                {this.props.lastSeen}
              </span>
            </h3>
          </div>
        </div>
        <div className='m-portlet__head-tools'>
          <ul className='nav nav-pills nav-pills--brand m-nav-pills--align-right m-nav-pills--btn-pill m-nav-pills--btn-sm' role='tablist'>
            <li className='nav-item m-tabs__item'>
              <Icon name='search' size='large' />
            </li>
            <li className='nav-item m-tabs__item'>
              <Dropdown text='Attachment' icon='attach' floating labeled button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item icon='image' text='Image' />
                  <Dropdown.Item icon='file' text='Document' />
                  <Dropdown.Item icon='speaker' text='Audio' />
                  <Dropdown.Item icon='video' text='Video' />
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
