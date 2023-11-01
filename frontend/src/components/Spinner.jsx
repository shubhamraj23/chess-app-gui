const Spinner = ({status}) => {
  return (
      <div className={`${status} absolute top-0`}>
        <div className="h-screen w-screen bg-gray-100 bg-opacity-50 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
  )
}

export default Spinner