import ChessPiece from './ChessPiece'
import { connect } from 'react-redux'

const PawnPromotion = ({ width, player, setPromotedMove, toRow, toCol }) => {
  const options = ['queen', 'knight', 'rook', 'bishop']
  
  const handleClick = (type) => {
    const move = { toRow, toCol, newPiece: type }
    setPromotedMove(move)
  }

  return (
    <div className="z-10 absolute top-0 flex flex-row items-center">
      <div className="my-auto" style={{ width: `${width}px`, height: `${width * 4.3}px` }}>
        {options.map((cell, index) => (
          <div key={index} onClick={() => handleClick(`${player}-${cell}`)}>
            <div className={`relative flex items-center justify-center bg-white cursor-pointer`} 
              style={{ width: `${width}px`, height: `${width}px` }}>
                <ChessPiece type={`${player}-${cell}`} />
            </div>
          </div>
        ))}

        <div className='bg-white flex justify-center items-center cursor-pointer' style={{ width: `${width}px`, height: `${0.3 * width}px` }}
          onClick={() => setPromotedMove('close')}>
            <div className="flex items-center justify-center border border-red-500 rounded-full"
              style={{ width: `${0.25 * width}px`, height: `${0.25 * width}px` }}>
                <span className="text-red-500">&#10060;</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    player: state.game.player
  }
}

export default connect(mapStateToProps)(PawnPromotion)