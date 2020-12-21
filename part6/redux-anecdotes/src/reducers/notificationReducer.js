const initialState = ''


const visible = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

export const notifyVote = (content) => {

    return {
      type: 'NOTIFY_VOTE',
      data: {
        content: 'you voted ' + content,
        style: visible
      }
    }
  }

  export const notifyAdd = (content) => {
    
    return {
      type: 'NOTIFY_ADD',
      data: {
        content: 'you added ' + content,
        style: visible
      }
    }
  }

  export const clear = (content) => {
    return {
      type: 'CLEAR',
      data: {
        content,
        syle: null
      }
    }
  }
  

const notificationReducer = (state=initialState, action) => {
  switch(action.type) {
    case('NOTIFY_VOTE'): 
      return action.data
        
    case('NOTIFY_ADD'):
      return action.data

    case('CLEAR'):
      return ''

    default:
      return state
  }  
  
  
}

export default notificationReducer