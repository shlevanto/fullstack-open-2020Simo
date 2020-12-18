import { createStore, combineReducers } from 'redux'
import {composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer
})

/*const store = createStore(
  reducer,
  composeWithDevTools()
)*/

const store = createStore(anecdoteReducer)

export default store