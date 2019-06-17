import qs from 'qs'
import path from 'path'
import Express from 'express'
import React from 'react'
import todoApp from '@/store/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import App from '../App'
import ReactDOMServer from 'react-dom/server'

const app = Express();
const port = 3000;

// 每当收到请求时都会触发
app.use(handleRender);

function handleRender(req, res) {
    const params = qs.parse(req.query);
    const state = JSON.parse(params) || {todos: [
        {text: '写代码', completed: false}
    ],
        visibilityFilter: 'SHOW_ALL'
    };

    // 创建新的 Redux store 实例
    const store = createStore(todoApp, state, applyMiddleware(thunkMiddleware));

    // 把组件渲染成字符串
    const html = ReactDOMServer.renderToNodeStream(
        <App store={store} />
    );

    // 从 store 中获得初始 state
    const preloadedState = store.getState();

    // 把渲染后的页面内容发送给客户端
    res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html lang="utf8">
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port);
