import React, { Component } from 'react'
import Avatar from 'react-avatar'

class Header extends Component {
  render () {
    return (
      <div className='col-lg-8 col-md-8 col-sm-8' style={{padding: '0px', marginLeft: '-2px'}}>
        <div className='m-portlet m-portlet--full-height '>
          <div className='m-portlet__head' style={{background: '#ebedf2', border: '1px solid #909090'}}>
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
                <li className='nav-item m-tabs__item' style={{width: '30px', color: '#7b7e8a'}}>
                  <i className='flaticon flaticon-search' />
                </li>
                <li className='nav-item m-tabs__item' style={{width: '30px', color: '#7b7e8a'}}>
                  <i className='flaticon flaticon-attachment' />
                </li>
                <li className='nav-item m-tabs__item' style={{width: '20px', color: '#7b7e8a', marginTop: '3px'}}>
                  <i className='fa fa-ellipsis-v' />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
