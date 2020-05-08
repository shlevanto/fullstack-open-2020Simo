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

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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