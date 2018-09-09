import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, TextArea } from 'semantic-ui-react'

class Chatbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='m-portlet__foot m-portlet__foot--fit m--margin-top-40' style={{height: '71px', background: '#E8E8E8'}}>
				<div className='row'>
        <div className='col-md-1'>
        <i className='fa fa-smile-o' style={{cursor: 'pointer', fontSize: '30px', paddingTop: '16px', paddingLeft: '10px', color: 'rgb(123, 126, 138)'}}/>
        </div>
        <div className='col-md-10' style={{padding: '0px'}}>
        <Form style={{paddingTop: '5px'}}>
        <TextArea rows={2} fluid placeholder='Type a Message...' style={{borderRadius: '30px'}} />
        </Form>
        </div>
        <div className='col-md-1' style={{padding: '0px'}}>
        <i className='fa fa-microphone' style={{cursor: 'pointer', fontSize: '30px', paddingTop: '16px', paddingLeft: '10px', color: 'rgb(123, 126, 138)'}} />
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox)
