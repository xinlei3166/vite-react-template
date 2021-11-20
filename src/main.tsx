import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from '@/store'
import 'virtual:windi.css'
import '@/styles/index.less'
import('./mock')

ReactDOM.render(
  // <React.StrictMode></React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// import * as serviceWorker from './serviceWorker'
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
