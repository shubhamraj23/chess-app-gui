import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../reducers/boardReducer'
import moveReducer from '../reducers/moveReducer'
import gameReducer from '../reducers/gameReducer'
import timeReducer from '../reducers/timeReducer'

const store = configureStore({
  reducer: {
    board: boardReducer,
    move: moveReducer,
    game: gameReducer,
    time: timeReducer
  }
})

export default store