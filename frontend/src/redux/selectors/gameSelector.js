const selectPlayer = (state) => state.player
const selectKingMoved = (state) => state.kingMoved
const selectLeftRookMoved = (state) => state.leftRookMoved
const selectRightRookMoved = (state) => state.rightRookMoved

export {
  selectPlayer,
  selectKingMoved,
  selectLeftRookMoved,
  selectRightRookMoved
}