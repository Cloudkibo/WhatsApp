import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {uploadMedia} from '../../redux/actions/media.actions'
import PageTile from './../../components/pageTitle'
import Header from './../../components/chat/header'
import SessionsList from './../../components/chat/sessionsList'
import SessionSearch from './sessionSearch'
import Chatbox from './chatbox'
import Conversation from './../../components/chat/conversation'
import Uploads from './../../components/chat/uploads'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploaded: false,
      uploadDescription: '',
      attachment: [],
      attachmentType: '',
      removeFileDescription: '',
      uploadedId: '',
      uploadedUrl: ''
    }
  }

  onFileChange = (e) => {
    let files = e.target.files
    console.log('e.target.files', e.target.files)
    let file = e.target.files[files.length - 1]
    if (files.length > 0) {
      this.resetFileComponent()
      this.setState({
        attachment: file,
        attachmentType: file.type
      })
      if (file.type === 'text/javascript' || file.type === 'text/exe') {
        this.msg.error('Cannot add js or exe files. Please select another file')
      } else if (file.size > 25000000) {
        this.msg.error('Files greater than 25MB not allowed')
      } else {
        let fileData = new FormData()
        fileData.append('file', file)
        fileData.append('filename', file.name)
        fileData.append('filetype', file.type)
        fileData.append('filesize', file.size)
        console.log('file', file)
        this.setState({uploadDescription: 'File is uploading...'})
        this.props.uploadMedia(fileData, this.handleUpload)
      }
    }
  }
  resetFileComponent = () => {
    this.setState({
      attachment: [],
      attachmentType: '',
      uploaded: false,
      uploadDescription: '',
      uploadedId: '',
      uploadedUrl: '',
      removeFileDescription: ''
    })
  }

  handleUpload = (res) => {
    if (res.status === 'failed') {
      this.setState({
        uploaded: false,
        attachment: [],
        uploadDescription: res.description,
        attachmentType: '',
        componentType: '',
        uploadedId: '',
        uploadedUrl: '',
        removeFileDescription: ''
      })
    }
    if (res.status === 'success') {
      this.setState({uploaded: true, uploadDescription: '', removeFileDescription: '', uploadedId: res.payload.mediaId, uploadedUrl: res.payload.url})
    }
    console.log('res.payload', res.payload)
  }

  handleRemove = (res) => {
    if (res.status === 'success') {
      this.resetFileComponent()
    }
    if (res.status === 'failed') {
      this.setState({uploaded: true, removeFileDescription: res.description})
    }
  }

  removeAttachment = () => {
    if (this.state.uploadedId !== '') {
      this.props.deleteMedia(this.state.uploadedId, this.handleRemove)
    }
  }

  render () {
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <PageTile title={'Chat'} />
        <div className='m-content'>
          <div className='row'>
            <div className='col-lg-4 col-md-4 col-sm-4' style={{padding: '0px'}}>
              <div className='m-portlet'>
                <SessionSearch />
                <SessionsList />
              </div>
            </div>
            <div className='col-lg-8 col-md-8 col-sm-8' style={{padding: '0px', marginLeft: '-2px'}}>
              <div className='m-portlet'>
                <Header name='anisha' lastSeen='Last seen today at 1:40 PM' onFileChange={this.onFileChange} />
                <div className='m-portlet__body' style={{borderLeft: '1px solid rgb(144, 144, 144)', borderRight: '1px solid rgb(144, 144, 144)', borderBottom: '1px solid rgb(144, 144, 144)', padding: '0px'}} >
                  <Conversation />
                  <Chatbox />
                  <Uploads uploaded={this.state.uploaded}
                    removeAttachment={this.removeAttachment}
                    attachment={this.state.attachment}
                    removeFileDescription={this.state.removeFileDescription}
                    uploadDescription={this.state.uploadDescription} />
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

  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    uploadMedia
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
