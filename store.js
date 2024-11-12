import { configureStore } from '@reduxjs/toolkit'
import appReducer from './src/redux/unboxd_redux.js'

export default configureStore({
  reducer: {
    data: appReducer,
  },
})