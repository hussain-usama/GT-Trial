import { configureStore } from '@reduxjs/toolkit'
import  UserReducer  from './Reducers/UserReducer'
import  DashboardReducer  from './Reducers/DashboardReducer'

export const store = configureStore({
  reducer: {
    user:UserReducer,
    dashboard:DashboardReducer
  },
})