import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Search, Select, Button } from 'semantic-ui-react'
class GroupSearch extends Component {
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

      <div className='row' style={{marginTop: -25 + 'px'}}>
        <div className='col-xl-8'>
          <Search
            style={{ marginTop: 0 + 'px', padding: 5 + 'px' }}
            loading={this.state.isLoading}
            onResultSelect={() => { console.log('Group Selected') }}
            onSearchChange={() => { console.log('Search Changed') }}
            results={this.state.results}
            value={this.state.value}
            placeholder='Search Groups'
          />
        </div>
        <div className='col-xl-4'>
          <Select placeholder='Bulk Actions' options={this.state.bulkActions} />
          <Button primary style={{marginLeft: 10 + 'px'}}> Execute </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch)
