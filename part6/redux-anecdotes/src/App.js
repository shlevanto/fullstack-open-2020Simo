import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { voteFor } from './reducers/anecdoteReducer'
const App = () => {
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
  
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }



  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(newAnecdote(content))
  }

  const newAnecdote = (content) => {
    return{
      type: 'NEW_ANECDOTE',
      data: {
        content
      }
    }
  }

  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App