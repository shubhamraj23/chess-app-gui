import { useState, useEffect } from "react"

const ChessCell = ({children, isDark, width, type, player, turn}) => {
  const [cursor, setCursor] = useState('')

  useEffect(() => {
    if (type && turn) {
      const prefix = (player === 0) ? 'white' : 'black'
      if (type.startsWith(prefix)) setCursor('cursor-pointer')
    }
  }, [])

  return (
    <div className={`flex items-center justify-center ${isDark ? 'dark-cell' : 'light-cell'} ${cursor}`} 
      style={{ width: `${width}px`, height: `${width}px` }}>
        {children}
    </div>
  )
}

export default ChessCell