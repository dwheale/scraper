import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import addressReducer from './address.reducer'
import imageServiceReducer from './image-service.reducer'
import imagesReducer from './images.reducer'
import errorReducer from './error.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['address', 'service']
}

const rootReducer = combineReducers({
  address: addressReducer,
  service: imageServiceReducer,
  images: imagesReducer,
  error: errorReducer,
})

export const pReducer = persistReducer(persistConfig, rootReducer)

export default pReducer