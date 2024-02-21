import { configureStore } from '@reduxjs/toolkit'
import cellReducer from '../reducers/cellReducer'

const store = configureStore({
  reducer: {
    chessboard: cellReducer,
  }
})

export default store