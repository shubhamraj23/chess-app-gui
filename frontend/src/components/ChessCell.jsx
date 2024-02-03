import ChessPiece from './ChessPiece'

const ChessCell = ({isDark, children}) => {
  return (
    <div className={`w-8 h-8 flex items-center justify-center ${isDark ? 'bg-dark' : 'bg-light'}`}>
      {children && <ChessPiece type={children} />}
    </div>
  )
}

export default ChessCell