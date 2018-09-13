import React, { Component } from 'react'

class Sidebar extends Component {
  render () {
    return (
      <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
        <div className='m-portlet m-portlet--full-height'>
          <div className='m-portlet__body'>
            <div className='m-card-profile'>
              <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} className='m-card-profile__details'>
                <span className='m-card-profile__name'>
                  {(this.props.user) ? this.props.user.companyName : ''}
                </span>
                <span className='m-card-profile__email'>
                  {(this.props.user) ? this.props.user.email : ''}
                </span>
              </div>
            </div>
            <ul className='m-nav m-nav--hover-bg m-portlet-fit--sides'>
              <li className='m-nav__separator m-nav__separator--fit' />
              <li className='m-nav__item'>
                <a className='m-nav__link' style={{cursor: 'pointer'}}>
                  <i className='m-nav__link-icon flaticon-share' />
                  <span className='m-nav__link-text'>Agents</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
