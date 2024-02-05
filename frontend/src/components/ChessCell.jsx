import ChessPiece from './ChessPiece'

const ChessCell = ({isDark, width}) => {
  return (
    <div className={`flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`} 
      style={{ width: `${width}px`, height: `${width}px` }}>
      <ChessPiece />
    </div>
  )
}

export default ChessCell