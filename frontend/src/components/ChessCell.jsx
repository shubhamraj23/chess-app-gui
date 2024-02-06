const ChessCell = ({children, isDark, width}) => {
  return (
    <div className={`flex items-center justify-center ${isDark ? 'dark-cell' : 'light-cell'}`} 
      style={{ width: `${width}px`, height: `${width}px` }}>
        {children}
    </div>
  )
}

export default ChessCell