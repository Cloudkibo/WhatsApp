import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Groups from './../containers/groups/groups'
import Contacts from './../containers/contacts/contacts'
import GroupDetail from './../containers/groups/groupDetail'

class Main extends Component {
  render () {
    return (

      <Switch>
        <Route exact path='/' component={Groups} />
        <Route exact path='/groupDetail' component={GroupDetail} />
        <Route exact path='/contacts' component={Contacts} />
      </Switch>

    )
  }
}

export default Main
