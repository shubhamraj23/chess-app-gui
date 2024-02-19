import { configureStore } from '@reduxjs/toolkit'
import chessboardReducer from '../reducers/chessboardReducer'

const store = configureStore({
  reducer: {
    chessboard: chessboardReducer,
  }
})

export default store