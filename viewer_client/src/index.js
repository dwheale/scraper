import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { BrowserRouter } from 'react-router-dom'

render(
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={ persistor }>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)
