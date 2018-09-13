import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChatActions from '../../redux/actions/chat.actions'
import {uploadMedia, deleteMedia} from '../../redux/actions/media.actions'
import PageTile from './../../components/pageTitle'
import Header from './../../components/chat/header'
import SessionsList from './../../components/chat/sessionsList'
import SessionSearch from './sessionSearch'
import Chatbox from './chatbox'
import Conversation from './../../components/chat/conversation'
import Preview from './../../components/chat/preview'
import Uploads from './../../components/chat/uploads'
const _find = require('lodash/find')

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploaded: false,
      uploadDescription: '',
      attachment: [],
      attachmentType: '',
      removeFileDescription: '',
      uploadedId: false,
      uploadedUrl: '',
      selectedChats: [],
      selectedSession: ''
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
      } else if (file.size > 16000000) {
        this.msg.error('Files greater than 25MB not allowed')
      } else {
        let fileData = new FormData()
        fileData.append('file', file)
        fileData.append('filename', file.name)
        fileData.append('filetype', file.type)
        fileData.append('filesize', file.size)
        console.log('file', file)
        console.log('file', fileData)
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
      uploadedId: false,
      uploadedUrl: '',
      removeFileDescription: ''
    })
  }

  handleUpload = (res) => {
    console.log('Response from file upload', res)
    if (res.status === 'failed') {
      this.setState({
        uploaded: false,
        attachment: [],
        uploadDescription: res.description,
        attachmentType: '',
        componentType: '',
        uploadedId: false,
        uploadedUrl: '',
        removeFileDescription: ''
      })
    }
    if (res.status === 'success') {
      console.log('success payload', res.payload)
      this.setState({uploaded: true, uploadDescription: '', removeFileDescription: '', uploadedId: res.payload.media[0].id})
    }
    console.log('res.payload', res.payload)
  }

  handleRemove = (res) => {
    if (res.status === 'success') {
      console.log('reset file component')
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.chats && this.state.selectedSession !== '') {
      let newSession = _find(nextProps.chats, {sessionIdentifier: this.state.selectedSession})
      this.selectSession(newSession)
    }
  }

  selectSession = (session) => {
    this.setState({selectedChats: session.messages, selectedSession: session.sessionIdentifier})
  }

  render () {
    return (
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        <PageTile title={'Chat'} />
        <div className='m-content'>
          <div className='row'>
            <div className='col-lg-4 col-md-4 col-sm-4' style={{padding: '0px'}}>
              <div className='m-portlet' style={{height: '100%'}}>
                <SessionSearch />
                <SessionsList chats={this.props.chats} selectSession={this.selectSession} />
              </div>
            </div>

            <div className='col-lg-8 col-md-8 col-sm-8' style={{padding: '0px', marginLeft: '-2px'}}>
              <div className='m-portlet' style={{height: '100%'}}>
                {(this.state.selectedSession !== '') && <div style={{height: '100%'}}>
                  <Header name={this.state.selectedSession} onFileChange={this.onFileChange}
                    lastSeen='Last seen today at 1:40 PM' />
                  <div className='m-portlet__body' style={{padding: '0px', height: '100%'}} >
                    {
                      (this.state.uploadedId)
                        ? <Preview onClosePreview={this.resetFileComponent} uploadedId={this.state.uploadedId}
                          attachmentType={this.state.attachmentType}
                          sessionId={this.state.selectedSession}
                          sendMessage={this.props.sendImageMessage}
                          removeAttachment={this.removeAttachment}
                        />
                        : <span>
                          <Conversation chats={this.state.selectedChats} />
                          <Chatbox sessionId={this.state.selectedSession} />
                          <Uploads uploaded={this.state.uploaded}
                            removeAttachment={this.removeAttachment}
                            attachment={this.state.attachment}
                            removeFileDescription={this.state.removeFileDescription}
                            uploadDescription={this.state.uploadDescription} />
                        </span>
                    }
                  </div>
                </div>
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log('State of Chat Reducer', state.chatReducer)
  return {
    chats: state.chatReducer.chats
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    sendImageMessage: ChatActions.sendImageMessage,
    uploadMedia,
    deleteMedia
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
