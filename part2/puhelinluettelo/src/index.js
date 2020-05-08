import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('..')
  
  const Person = (props) => {
    return (
      <p>{props.name}</p>
    )
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    setPersons(persons.concat(nameObject))
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)

  }
  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit = {addName}>
        <div>
          name: <input 
          value = {newName}
          onChange = {handleNewName}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
        <Person name = {person.name}/>)}
      </div>
    </div>
  )

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
