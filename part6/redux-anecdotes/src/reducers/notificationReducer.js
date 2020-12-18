const initialState = ''

export const notifyVote = (content) => {
  console.log('notifier notifies:', content)
    return{
      type: 'NOTIFY_VOTE',
      data: {
        content
      }
    }
  }

  export const notifyAdd = (content) => {
    return {
      type: 'NOTIFY_ADD',
      data: {
        content
      }
    }
  }

  export const clear = () => {
    return {
      type: 'CLEAR'
    }
  }
  

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case('NOTIFY_VOTE'): 
      return 'you voted ' + action.data.content
        
    case('NOTIFY_ADD'):
      return 'you added ' + action.data.content

    case('CLEAR'):
      return initialState

    default:
      return initialState
  }  
  
  
}

export default notificationReducer