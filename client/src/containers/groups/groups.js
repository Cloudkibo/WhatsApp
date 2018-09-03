import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGroup, loadGroupsList } from '../../redux/actions/groups.actions'
import { Message } from 'semantic-ui-react'

import PageTile from './../../components/pageTitle'
import HelpAlert from './../../components/themeComponents/helpAlert'
import PortletHead from './../../components/themeComponents/portletHead'
import GroupTable from './../../components/groups/groupTable'
import GroupSearch from './groupSearch'
import CreateGroup from './../../components/groups/createGroup'

class Groups extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
    this._onChange = this._onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.props.loadGroupsList()
  }
  handleClose () {
    this.setState({ showModal: false })
  }
  onCreate (title) {
    console.log('title:', title)
    if (title === '') {
      console.log('in if')
      return
    }
    this.handleClose()
    this.props.createGroup({title: title})
  }
  _onChange (images) {
    // Assuming only image
    var file = this.refs.file.files[0]
    if (file) {
      if (file && file.type !== 'image/bmp' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        this.msg.error('Please select an image of type jpg, gif, bmp or png')
        return
      }
      var reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = function (e) {
        this.setState({
          imgSrc: [reader.result]
        })
      }.bind(this)

      this.setState({
        showPreview: false,
        loading: true
      })
      this.props.uploadImage(file, this.props.pages[0]._id, 'image', {
        id: this.props.id,
        componentType: 'image',
        fileName: file.name,
        fileurl: '',
        image_url: '',
        type: file.type, // jpg, png, gif
        size: file.size
      }, this.props.handleImage, this.setLoading)
    }
  }
  render () {
    console.log('Props from Groups', this.props)
    return (
      <div>
        <PageTile title={'Manage Groups'} />
        <div className='m-content'>
          <HelpAlert message={'Here you can view the list of all the groups that you have joined.'} />
          {this.state.showModal &&
            <CreateGroup onCreate={this.onCreate} showModal={this.state.showModal} handleClose={this.handleClose} />
          }
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <PortletHead title={'Groups'} buttonTitle={'New Group'} buttonAction={() => { this.setState({showModal: true}) }} />
                <div className='m-portlet__body' />
                <GroupSearch />
                <GroupTable viewDetail={() => { this.props.history.push('/groupDetail') }} groups={this.props.groups} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    message: state.testReducer.serverMessage,
    groups: state.groupReducer.groups
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    createGroup,
    loadGroupsList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
