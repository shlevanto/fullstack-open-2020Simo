import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {

  return (
  <p>
    {props.text} {props.value} {props.text2}
  </p>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const sum = props.sum
  const total = good + bad + neutral
  const average = sum / total
  const positive = 100 * good / total

  
  if (total == 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <tr><td><StatisticsLine text = 'good' value = {good} /></td></tr>
        <tr><td> <StatisticsLine text = 'neutral' value = {neutral} /></td></tr>
        <tr><td><StatisticsLine text = 'bad' value = {bad} /></td></tr>
        <tr><td><StatisticsLine text = 'all' value = {total}/> </td></tr>
        <tr><td><StatisticsLine text = 'average' value = {average.toFixed(1)} /></td></tr>
        <tr><td><StatisticsLine text = 'positive' value = {positive.toFixed(1)} text2 = '%'/></td></tr>
        </tbody>
    </table>
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