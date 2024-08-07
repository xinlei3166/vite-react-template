import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@packages/styles/index.less'
import '@packages/styles/reset.less'
import '@/styles/index.less'
import 'animate.css'
import 'virtual:uno.css'
import('./mock')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// import * as serviceWorker from './serviceWorker'
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
