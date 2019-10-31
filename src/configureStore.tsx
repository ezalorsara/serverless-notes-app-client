import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router']
}


export default function configureStore(preloadedState?: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
      ),
    )
  );

  const persistor = persistStore(store);
  return { store, persistor }

}