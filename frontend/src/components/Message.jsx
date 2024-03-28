const Message = ({status, text, handleClick}) => {
  return (
    <div className={`${status} absolute top-0`}>
      <div className="h-screen w-screen bg-gray-100 bg-opacity-70 flex flex-col items-center justify-center">
        <div className="bg-white rounded-md shadow-md">
          <div className="p-8 text-center">
            <p className="text-lg">{text}</p>
          </div>

          <div className="flex flex-row w-full justify-center mb-4">
            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => handleClick(true)}>
                Yes
            </button>

            <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => handleClick(false)}>
                No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message