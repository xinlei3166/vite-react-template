import type { Middleware } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { createLogger } from 'redux-logger'
import Raven from 'raven-js'
import user from './user'
import todo from './todo'
import theme from './theme'

const logger = createLogger()

// const logger: Middleware = store => next => action => {
//   console.log('dispatching', action)
//   const result = next(action)
//   console.log('next state', store.getState())
//   return result
// }

const crashReporter: Middleware = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

const DEV = import.meta.env.MODE === 'development'

const middlewares = [crashReporter].concat(DEV ? logger : [])

const store = configureStore({
  reducer: {
    user,
    todo,
    theme
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
  devTools: DEV
})

export * from './user'
export * from './todo'
export * from './theme'
export * from './menu'
export * from './cos'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
