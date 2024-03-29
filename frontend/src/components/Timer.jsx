import { useState, useEffect } from 'react'

const Timer = ({running, initialTime}) => {
  const [timerValue, setTimerValue] = useState(initialTime)

  useEffect(() => {
    if (running && timerValue > 0) {
      const startTime = new Date().getTime()
      const timer = setTimeout(() => {
        let currentTime = new Date().getTime()
        const elapsedTime = currentTime - startTime
        setTimerValue(Math.max(timerValue - elapsedTime, 0))
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [running, timerValue])

  const generateTime = (value) => {
    const seconds = Math.round(value/1000)%60
    const minutes = Math.floor(Math.round(value/1000)/60)
    return `${setOffset(minutes)}:${setOffset(seconds)}`
  }

  const setOffset = (time) => {
    if (time < 10) return `0${time}`
    return time
  }

  return (
    <div className="mx-auto flex justify-center items-center h-full">
      <p className="bg-white rounded-lg text-red-500 font-courier inline-block py-1 px-3 font-bold">{generateTime(timerValue)}</p>
    </div>
  )
}

export default Timer