import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './redux/store/store'
import App from './components/App'
import { BrowserRouter, Route } from 'react-router-dom'

const store = configureStore()
const rootElement = document.getElementById('root')

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
), rootElement)
