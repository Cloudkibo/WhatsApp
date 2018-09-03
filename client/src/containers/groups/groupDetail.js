import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadImage } from '../../redux/actions/groups.actions'

import PageTile from './../../components/pageTitle'
import InfoHeader from './../../components/groups/infoHeader'
import ParticipantList from './../../components/groups/participants'

class GroupDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this._onChange = this._onChange.bind(this)
  }
  _onChange (e) {
    var files = e.target.files
    var file = e.target.files[files.length - 1]
    var fileData = new FormData()
    fileData.append('file', file)
    fileData.append('filename', file.name)
    fileData.append('filetype', file.type)
    fileData.append('filesize', file.size)
    fileData.append('componentType', this.state.componentType)
    console.log('file', file)
    this.setState({uploadDescription: 'File is uploading..'})
    this.props.uploadImage(fileData, '5b8d0c96898b793182eac4c1')
  }
  render () {
    return (
      <div style={{width: 80 + 'vw'}}>
        <PageTile title={'Group Info'} />
        <div className='m-content'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <InfoHeader groupName={'Group Name'} createdAt={'20-Aug-2018'} participants={'05'} admins={'02'} handleImage={this._onChange} />
                  <ParticipantList />
                </div>
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
    message: state.testReducer.serverMessage
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    uploadImage: uploadImage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail)
