import React from 'react'

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
  
  return (
    <p>Number of exercises {total}</p>
  )
}

const Course = ({course}) => {
  
  return (
    <>
    <Header name = {course.name} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts} />
    </>
  )
}

export default Course