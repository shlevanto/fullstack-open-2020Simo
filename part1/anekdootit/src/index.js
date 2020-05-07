import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const copy = {...anecdotes}
  
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)
  
  
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    setVotes(copy[selected].points)

  }

    
  const handleVote = () => {
  
    copy[selected].points += 1
    setVotes(copy[selected].points)
    
  }


  return (
    <div>
      <p>{anecdotes[selected].text}</p>
      <p>This anecdote has {copy[selected].points} votes</p>
      <button onClick = {handleVote}>vote</button>
      <button onClick = {handleClick}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  {
    text:'If it hurts, do it more often',
    points:0
  },
  {  
    text:'Adding manpower to a late software project makes it later!',
    points:0
  },
  {
    text:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    points:0
  },
  {
    text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    points:0
  },
  {
    text:'Premature optimization is the root of all evil.',
    points:0
  },
  {
  text:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  points:0
  }
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
