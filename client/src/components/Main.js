import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Groups from './../containers/groups/groups'
import GroupDetail from './../containers/groups/groupDetail'
import Signup from './../containers/signup/signup'

class Main extends Component {
  render () {
    return (

      <Switch>
        <Route exact path='/' component={Groups} />
        <Route exact path='/groupDetail' component={GroupDetail} />
        <Route exact path='/signup' component={Signup} />
      </Switch>

    )
  }
}

export default Main
