import ChessBoard from "./ChessBoard"

const GameRoom = () => {
  return (
    <div className="bg-gray-300">
      <div className="container mx-auto h-screen" id="game-container">
        <ChessBoard />
      </div>  
    </div>
    
  )
}

export default GameRoom