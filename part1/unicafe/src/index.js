import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// jatka kohdasta 1.7

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
      <p>all {good + bad + neutral}</p>
      <p>average {sum / (good + bad + neutral)}</p>
      <p>positive {good / (good + bad + neutral) * 100} %</p>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
)