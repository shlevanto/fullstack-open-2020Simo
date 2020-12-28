import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notifyAdd, clear } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    //const newDote = await anecdoteService.createNew(content) 

    dispatch(newAnecdote(content))
    
    dispatch(notifyAdd(content))
    
    setTimeout(() => {
      console.log('clear notification') 
      dispatch(clear())   
    }, 5000)
  }

  return (
    <div><h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm