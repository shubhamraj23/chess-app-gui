const joinRoom = (socket, gameId) => {
  socket.emit('join-room', gameId)
}

export {
  joinRoom
}