import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Toaster } from 'react-hot-toast';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
  <PersistGate loading={null} persistor={persistor}>
  <App />
    <Toaster/>
    </PersistGate>
  </React.StrictMode>
    </Provider>
);
