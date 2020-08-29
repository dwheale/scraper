import logger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import pReducer from './redux/root-reducer'

const middlewares = [logger]

export const store = createStore(pReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)
