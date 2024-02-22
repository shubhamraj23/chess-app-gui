import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../reducers/boardReducer'
import moveReducer from '../reducers/moveReducer'

const store = configureStore({
  reducer: {
    board: boardReducer,
    move: moveReducer
  }
})

export default store