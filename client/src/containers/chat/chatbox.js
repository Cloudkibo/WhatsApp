import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
// import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Popup } from 'semantic-ui-react'
import * as ChatActions from '../../redux/actions/chat.actions'

class Chatbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uploaded: false,
      uploadDescription: '',
      attachment: [],
      removeFileDescription: '',
      message: ''
    }
  }
  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.sendMessage({recepientType: '', to: '', type: '', messageBody: this.state.message})
      this.setState({message: ''})
      this.textInput.focus()
    }
  }
  onMessageChange = (e) => {
    this.setState({message: e.target.value})
  }
  render () {
    return (
      <div className='m-portlet__foot m-portlet__foot--fit' style={{height: '71px', background: '#E8E8E8'}}>
        <div className='row'>
          <div className='col-md-1'>
            <Popup
              trigger={<i className='fa fa-smile-o' style={{cursor: 'pointer', fontSize: '30px', paddingTop: '16px', paddingLeft: '10px', color: 'rgb(123, 126, 138)'}} />}
              content={<Picker
                emojiSize={24}
                perLine={6}
                skin={1}
                set='emojione'
                custom={[]}
                autoFocus={false}
                showPreview={false}
                onClick={(emoji, event) => this.setEmoji(emoji)}
              />}
              on='click'
              position='top center'
            />
          </div>
          <div className='col-md-10' style={{padding: '0px'}}>
            <textarea autoFocus ref={(input) => { this.textInput = input }} className='form-control m-input' rows='2' placeholder='Type a Message...' style={{borderRadius: '30px', marginTop: '8px'}} onKeyPress={this.onEnter} value={this.state.message} onChange={this.onMessageChange} />
          </div>
          <div className='col-md-1' style={{padding: '0px'}}>
            <i className='fa fa-microphone' style={{cursor: 'pointer', fontSize: '30px', paddingTop: '16px', paddingLeft: '10px', color: 'rgb(123, 126, 138)'}} />
          </div>
        </div>
        { this.state.uploaded
          ? <div style={{wordWrap: 'break-word', overFlow: 'auto', minHeight: '50px'}}>
            <span onClick={this.removeAttachment} style={{cursor: 'pointer', float: 'right'}} className='fa-stack'>
              <i style={{color: '#ccc'}} className='fa fa-times fa-stack-1x fa-inverse' />
            </span>
            <div><i className='fa fa-file-text-o' /> {this.state.attachment.name}</div>
            <div style={{wordWrap: 'break-word', color: 'red', fontSize: 'small'}}>{this.state.removeFileDescription}</div>
          </div>
          : <div style={{wordWrap: 'break-word', color: 'red', fontSize: 'small'}}>{this.state.uploadDescription}</div>
        }
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
    sendMessage: ChatActions.sendMessage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox)
