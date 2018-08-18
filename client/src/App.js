import React, { Component } from 'react'
// import fetch from 'isomorphic-fetch'
import logo from './logo.svg'
import './App.css'
import callApi from './utility/api.caller.service'

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount () {
    callApi('/v1/test').then((resp) => {
      console.log(resp)
      this.setState({ response: resp.payload })
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          {this.state.response}
        </p>
      </div>
    )
  }
}

export default App
