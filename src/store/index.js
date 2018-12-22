import { createStore, applyMiddleware, compose } from 'redux'
import Thunk from 'redux-thunk'
import reducers from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth', 'usersOnChange', 'realtimeUser', 'data'] // auth will not be persisted
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(Thunk)))

export const persistor = persistStore(store)
