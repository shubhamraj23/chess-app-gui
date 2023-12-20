const Spinner = ({status, text}) => {
  return (
      <div className={`${status} absolute top-0`} data-testid="spinner">
        <div className="h-screen w-screen bg-gray-100 bg-opacity-100 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin" data-testid="animation"></div>
          <div className="left-0">
            {text && <p className="mt-4 text-gray-1000">{text}</p>}
          </div>
        </div>
      </div>
  )
}

export default Spinner