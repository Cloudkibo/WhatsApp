import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Search, Select, Button } from 'semantic-ui-react'
import _ from 'lodash'
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

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      const payload = this.props.groups.map(item => ({
        title: item.title,
        description: item.createtime,
        image: (item.iconURL && item.iconURL !== '')
          ? `/api/v1/groups/${item.groupId}/icon`
          : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
      }))

      this.setState({
        isLoading: false,
        results: _.filter(payload, isMatch)
      })
    }, 300)
  }

  render () {
    return (

      <div className='row' style={{marginTop: -25 + 'px'}}>
        <div className='col-xl-8'>
          <Search
            style={{ marginTop: 0 + 'px', padding: 5 + 'px' }}
            loading={this.state.isLoading}
            onResultSelect={() => { console.log('Group Selected') }}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
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
