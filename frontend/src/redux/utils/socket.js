const joinRoom = (socket, gameId) => {
  socket.emit('join-room', gameId)
}

const sendMove = (socket, gameId, fromRow, fromCol, toRow, toCol, piece) => {
  const move = { fromRow, fromCol, toRow, toCol, piece}
  socket.emit('game-move', gameId, move)
}

export {
  joinRoom,
  sendMove,
}