import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../reducers/boardReducer'
import moveReducer from '../reducers/moveReducer'
import gameReducer from '../reducers/gameReducer'

const store = configureStore({
  reducer: {
    board: boardReducer,
    move: moveReducer,
    game: gameReducer
  }
})

export default store