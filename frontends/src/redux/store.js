import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userslice'
import messsageReducer from './messageSlice'
import socketReducer from "./socketSlice"

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }


const rootReducer=combineReducers({

    user: userReducer,
    message:messsageReducer,
    socket:socketReducer,
})
    
       
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
