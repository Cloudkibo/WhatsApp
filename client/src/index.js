import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './redux/store/store'
import App from './components/App'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import history from './history'
const store = configureStore()
const rootElement = document.getElementById('root')

const options = {
  position: 'bottom right',
  timeout: 5000,
  offset: '30px',
  theme: 'dark',
  transition: 'scale',
  zIndex: 100
}

class Root extends React.Component {
  render () {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
          <BrowserRouter history={history}>
            <Route component={App} />
          </BrowserRouter>
        </Provider>
      </AlertProvider>
    )
  }
}

ReactDOM.render((
  <Root />
), rootElement)
