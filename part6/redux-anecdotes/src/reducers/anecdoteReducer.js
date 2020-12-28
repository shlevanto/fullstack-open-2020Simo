import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = [] 

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state=[], action) => {
  switch(action.type) {
    case('VOTE'): 
      const id = action.data.id
      const voteForThisAnecdote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...voteForThisAnecdote,
        votes: voteForThisAnecdote.votes + 1 
      }
      
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    
    case('NEW_ANECDOTE'):
      console.log('reducer', action.data)
      if (action.data.content === '') {
        return initialState
      } else {
        const newAnecdote = asObject(action.data.content)
        return state.concat(newAnecdote)
      }
    
    case('INIT_ANECDOTES'):
      return action.data

    default: 
      return state
    }
}

export default anecdoteReducer