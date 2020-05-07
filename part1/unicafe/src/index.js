import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const sum = props.sum
  const total = good + bad + neutral
  
  return (
    <p>
      all {total} <br/>
      average {sum / total} <br/>
      positive {100 * good / total} %
    </p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good +1)
    setSum(sum+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    setBad(bad +1)
    setSum(sum-1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good = {good} neutral = {neutral} bad = {bad} sum = {sum} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
)