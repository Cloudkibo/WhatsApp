import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageTile from './../../components/pageTitle'
import Sidebar from './../../components/settings/sidebar'
import Agents from './../../components/settings/agents'
import AddAgent from './../../components/settings/addAgent'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      heading: ''
    }
  }
  handleClose = () => {
    this.setState({ showModal: false })
  }
  showModal = (heading) => {
    this.setState({ showModal: true, heading: heading })
  }
  render () {
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <PageTile title={'Settings'} />
        {this.state.showModal && <AddAgent showModal={this.state.showModal} handleClose={this.handleClose} heading={this.state.heading} /> }
        <div className='m-content'>
          <div className='row' style={{height: '600px'}}>
            <Sidebar user={this.props.user} />
            <Agents showModal={this.showModal} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.userReducer.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
