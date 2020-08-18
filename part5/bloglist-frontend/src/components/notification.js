import React from 'react'

const Notification = ({ message, errorType }) => {

  if (message === null) {
    return null
  }

  console.log(errorType)

  return (
    <div className={errorType}>
      {message}
    </div>
  )
}

export default Notification