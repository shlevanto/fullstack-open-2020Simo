import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  
  const notification = useSelector(state => state.notification)
  
  const visible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  console.log(notification)
  
  return (
    <div style={notification.style}>
      {notification.content}
    </div>
  )
}

export default Notification