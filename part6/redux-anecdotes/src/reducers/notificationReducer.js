const notificationAtStart = 'render here notification'

const asObject = (notification) => {
  return {
    content: notification, 
  }
}

const initialState = notificationAtStart


export const newNotification = (content) => {
  return{
    type: 'NEW_ANECDOTE',
    data: {
      content
    }
  }
}
const notificationReducer = (state = initialState, action) => {
  return 'notification'
  
}

export default notificationReducer