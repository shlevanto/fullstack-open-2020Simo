import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import anecdoteService from './services/anecdotes'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'

/*anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote})
  }))*/

  anecdoteService.getAll().then(anecdotes => 
    store.dispatch(initializeAnecdotes(anecdotes)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)