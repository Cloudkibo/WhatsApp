import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Groups from './../containers/groups/groups'
import GroupDetail from './../containers/groups/groupDetail'

class Main extends Component {
  render () {
    return (

      <Switch>
        <Route exact path='/' component={Groups} />
        <Route exact path='/groupDetail' component={GroupDetail} />
      </Switch>

    )
  }
}

export default Main
