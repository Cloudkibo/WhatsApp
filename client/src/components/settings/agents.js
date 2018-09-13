import React, { Component } from 'react'
import Avatar from 'react-avatar'

class Agents extends Component {
  render () {
    return (
      <div id='target' className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
        <div className='m-portlet m-portlet--full-height m-portlet--tabs  '>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-tools'>
              <ul className='nav nav-tabs m-tabs m-tabs-line   m-tabs-line--left m-tabs-line--primary' role='tablist'>
                <li className='nav-item m-tabs__item'>
                  <span className='nav-link m-tabs__link active'>
                    <i className='flaticon-share m--hide' />
                    Agents
                  </span>
                </li>
              </ul>
              <button className='btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill' onClick={() => this.props.showModal('Add Agent')} style={{marginTop: '15px'}} data-toggle='modal' data-target='#m_modal_1_2'>
                <span>
                  <i className='la la-plus' />
                  <span>
                    Add Agent
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className='tab-content'>
            <div className='m-content'>
              <div className='row'>
                <div className='col-xl-12 col-md-12 col-sm-12'>
                  <div className='m-portlet__body'>
                    <div className='tab-content'>
                      <div className='tab-pane active m-scrollable' role='tabpanel'>
                        <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                          <div className='tab-pane active' id='m_widget4_tab1_content'>
                            <div className='m-widget4'>
                              <div className='m-widget4__item'>
                                <div className='m-widget4__img m-widget4__img--pic'>
                                  <Avatar name='Anisha' round size='45' maxInitials='2' />
                                </div>
                                <div className='m-widget4__info'>
                                  <span className='m-widget4__title'>Anisha</span><br />
                                  <span className='m-widget4__sub'>anisha@cloudkibo.com</span>
                                </div>
                                <div className='m-widget4__ext'>
                                  <button className='m-btn m-btn--pill m-btn--hover-brand btn btn-secondary' style={{borderColor: '#5867dd', color: '#5867dd', marginRight: '10px'}} onClick={() => this.props.showModal('Edit Agent')}>
                                    Edit
                                  </button>
                                </div>
                                <div className='m-widget4__ext'>
                                  <button className='m-btn m-btn--pill m-btn--hover-danger btn btn-danger' style={{borderColor: '#f4516c', color: '#f4516c', marginRight: '10px'}}>
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Agents
