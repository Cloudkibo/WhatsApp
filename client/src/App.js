import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount () {
    this.callApi()
  }

  callApi = () => {
    fetch('/api/v1/test', {mode: 'cors'})
      .then((response) => {
        response.json().then(json => {
          if (response.status !== 200) console.log(response)
          console.log(json)
          this.setState({response: json.payload})
        })
      })
  };

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
