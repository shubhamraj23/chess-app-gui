import blackBishopImage from '../images/black-bishop.png'
import blackKingImage from '../images/black-king.png'
import blackKnightImage from '../images/black-knight.png'
import blackPawnImage from '../images/black-pawn.png'
import blackQueenImage from '../images/black-queen.png'
import blackRookImage from '../images/black-rook.png'
import whiteBishopImage from '../images/white-bishop.png'
import whiteKingImage from '../images/white-king.png'
import whiteKnightImage from '../images/white-knight.png'
import whitePawnImage from '../images/white-pawn.png'
import whiteQueenImage from '../images/white-queen.png'
import whiteRookImage from '../images/white-rook.png'

const ChessPiece = ({type}) => {
  const getSource = () => {
    if (type === 'black-bishop') return blackBishopImage
    else if (type === 'black-king') return blackKingImage
    else if (type === 'black-knight') return blackKnightImage
    else if (type === 'black-pawn') return blackPawnImage
    else if (type === 'black-queen') return blackQueenImage
    else if (type === 'black-rook') return blackRookImage
    else if (type === 'white-bishop') return whiteBishopImage
    else if (type === 'white-king') return whiteKingImage
    else if (type === 'white-knight') return whiteKnightImage
    else if (type === 'white-pawn') return whitePawnImage
    else if (type === 'white-queen') return whiteQueenImage
    else if (type === 'white-rook') return whiteRookImage
  }
  
  return (
    <div className='flex items-center justify-center'>
      <img src={getSource()} alt={type} className="w-4/5 h-4/5" />
    </div>
  )
}

export default ChessPiece
