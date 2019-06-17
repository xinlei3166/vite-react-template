import todoApp from '@/store/reducers'
import { createStore, applyMiddleware } from 'redux'
// import {logger, crashReporter} from "@/store/middleware";
// import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

// const loggerMiddleware = createLogger();
// const store = createStore(todoApp, window.STATE_FROM_SERVER);
// const store = createStore(todoApp, applyMiddleware(logger, crashReporter));
// const store = createStore(todoApp, applyMiddleware(thunkMiddleware, loggerMiddleware));
const store = createStore(todoApp, applyMiddleware(thunkMiddleware));

export default store;
