import React from 'react'
import { render } from 'react-dom'
import App from '../App'
import todoApp from '@/store/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__INITIAL_STATE__;

// 使用初始 state 创建 Redux store
const store = createStore(todoApp, preloadedState, applyMiddleware(thunkMiddleware));

render(
    <App store={store} />,
    document.getElementById('root')
);

