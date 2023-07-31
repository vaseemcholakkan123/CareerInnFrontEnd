import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import { loadUserFromLocalStorage } from './userReducer';

export const store = configureStore({
  reducer: {
    logged_user:userReducer,
  },
})

store.dispatch(loadUserFromLocalStorage());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch