import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Search } from 'semantic-ui-react'
class GroupSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }

  render () {
    return (

      <div className='row'>
        <label style={{ marginTop: -37 + 'px', paddingLeft: 50 + 'px' }}>Search Groups: </label>
        <Search
          style={{ marginTop: -60 + 'px', padding: 15 + 'px' }}
          loading={this.state.isLoading}
          onResultSelect={() => { console.log('Group Selected') }}
          onSearchChange={() => { console.log('Search Changed') }}
          results={this.state.results}
          value={this.state.value}
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch)
