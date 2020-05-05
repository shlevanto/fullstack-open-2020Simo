import React from 'react';
import ReactDOM from 'react-dom';

const Header = () => {
  return (
    <div>
      <h1>Half Stack application development</h1>
    </div>
    )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}
      </p>
    </div>
  )
}
const Content = () => {
  return (
    <div>
      <Part name = 'Fundamentals of React' exercises = {10} />
      <Part name = 'Using props to pass data' exercises = {7} />
      <Part name = 'State of a component' exercises = {14} />
    </div>
  )
}

const App = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
      <Header />
      <p>
        <Content />
      </p>
      <p>Number of excercises {exercises1 + exercises2 + exercises3}</p>
    </div>

  )

}

ReactDOM.render(<App />, document.getElementById('root'))