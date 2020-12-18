import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notifyVote, clear } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteList = () => {

  const dispatch = useDispatch() 

  const anecdotes = useSelector(state => state.anecdotes)
  anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
  
  
  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(notifyVote(content))
    
    setTimeout(() => {
      console.log('clear notification') 
      dispatch(clear())   
    }, 5000)
  }



 return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList