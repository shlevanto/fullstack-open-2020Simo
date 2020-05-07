import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// jatka tehtävästä 1.10
const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {

  return (
  <div>
    {props.text} {props.value} {props.text2}
  </div>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const sum = props.sum
  const total = good + bad + neutral
  
  if (total == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <p>
      <StatisticsLine text = 'good' value = {good} />
      <StatisticsLine text = 'neutral' value = {neutral} />
      <StatisticsLine text = 'bad' value = {bad} />
      <StatisticsLine text = 'all' value = {total}/> 
      <StatisticsLine text = 'average' value = {sum / total} />
      <StatisticsLine text = 'positive' value = {100 * good / total} text2 = '%'/>
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
      <Button handleClick={() => handleGoodClick()} text = 'good'/>
      <Button handleClick={() => handleNeutralClick()} text = 'neutral' />
      <Button handleClick={() => handleBadClick()} text = 'bad' />
      <h1>Statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} sum = {sum} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
)