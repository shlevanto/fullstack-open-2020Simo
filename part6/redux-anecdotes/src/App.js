import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { voteFor, newAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
  
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
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
      <NewAnecdote />
    </div>
  )
}

export default App