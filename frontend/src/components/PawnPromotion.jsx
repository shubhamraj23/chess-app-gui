import ChessPiece from './ChessPiece'
import { connect } from 'react-redux'

const PawnPromotion = ({ width, player }) => {
  const options = ['queen', 'knight', 'rook', 'bishop']
  
  return (
    <div className="z-10 absolute top-0 flex flex-row items-center">
      <div className="my-auto" style={{ width: `${width}px`, height: `${width * 4.5}px` }}>
        {options.map((cell, index) => (
          <div key={index}>
            <div className={`relative flex items-center justify-center bg-white cursor-pointer`} 
              style={{ width: `${width}px`, height: `${width}px` }}>
                <ChessPiece type={`${player}-${cell}`} />
            </div>
          </div>
        ))}
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