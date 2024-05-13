import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import myStoreReducer from './features/mystore/myStoreSlice'
import userReducer from './features/user/userSlice'
import eventReducer from './features/event/eventSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myStore: myStoreReducer,
    user: userReducer,
    event: eventReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
