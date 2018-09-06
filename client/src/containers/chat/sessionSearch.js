import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Search } from 'semantic-ui-react'
class SessionSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      bulkActions: [
        {key: 'leave', value: 'Leave Group', text: 'Leave Group'}
      ]
    }
  }

  render () {
    return (
      <div className='m-portlet__head' style={{background: '#ebedf2', border: '1px solid #909090'}}>
        <Search
          input={{ fluid: true }}
          loading={true}
          placeholder='Search or start a new chat...'
          style={{marginTop: '14px'}}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(SessionSearch)
