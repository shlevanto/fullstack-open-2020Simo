import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  
  const Statistics = () => {
    const good = store.getState().good
    const neutral = store.getState().ok
    const bad = store.getState().bad
    const all = good + bad + neutral
    const average = (good - bad) / all
    const positive = good / all * 100
    
    if (all === 0) {
      return (<div>no statistics</div>)
    } else {

      return (
        <>
          <div>good: {good}</div>
          <div>neutral: {neutral}</div>
          <div>bad: {bad}</div>
          <div>all: {all}</div>
          <div>average: {average}</div>
          <div>positive: {positive} %</div>
        </>
      )
    }
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={good}>good</button> 
        <button onClick={neutral}>neutral</button> 
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
      </div>
      <h2>statistics</h2>
        <Statistics />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
