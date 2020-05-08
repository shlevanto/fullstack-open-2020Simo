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
  const parts = props.parts.map(part => part.exercises)

  const total = parts.reduce( (s, p) => s+p)

  console.log(total);
  
  return (
    <p>Number of exercises {total}</p>
  )
}

const Course = (props) => {
  const courses = props.courses
  
  return (
    <div>
      {courses.map(course =>
        <>
        <Header name = {course.name} />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
        </>
      )}
      
    </div>
  )
}

const App = () => {
  const courses = [
      {
        name: 'Half Stack application development', 
        id:0,
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
      },
      {
        name: 'Node.js',
        id: 2,
        parts: [
          { id: 1,
            name: 'Routing',
            exercises: 3
          },
          { id: 2,
            name: 'Middlewares',
            exercises: 7
          }
        ]
      }
]

  return (
    <div>
      <Header name = 'Web application development' />
      <Course courses = {courses} />    
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))