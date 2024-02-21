import { configureStore } from '@reduxjs/toolkit'
import cellReducer from '../reducers/cellReducer'
import moveReducer from '../reducers/moveReducer'

const store = configureStore({
  reducer: {
    chessboard: cellReducer,
    move: moveReducer
  }
})

export default store