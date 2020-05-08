import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts
  
  return (
  <ul>
    {parts.map(part =>
    <li key = {part.id}>
      {part.name} {part.exercises}
    </li>
      )}

  </ul>
  )
}


const euros = [29.76, 41.85, 46.5];

const sum = euros.reduce((total, amount) =>  total + amount)

console.log(sum)


const Total = (props) => {
  const parts = props.parts.map(part => part.exercises)

  const total = parts.reduce( (s, p) => s+p)

  console.log(total);
  

  
  return (
    <p>Number of exercises {total}</p>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header name = {props.course.name} />
      <Content parts = {props.course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development'
    , 
    parts: [
      { id: 1,
        name: 'Fundamentals of React',
        exercises:  10
      },

      { id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },

      { id: 3,
        name: 'State of a component',
        exercises: 14
      },

      { id: 4,
        name: 'Redux',
        exercises: 11
      }
  ]
  }

  return (
    <div>
      <Course course = {course} />    
      <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))