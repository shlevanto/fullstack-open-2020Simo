import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number : '0401231244'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  
  const Person = (props) => {
    return (
      <p>{props.name} {props.number}</p>
    )
  }

  
  const addPerson = (event) => { 
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    let inBook = false
      
    const checkName = (person) => {
      return person.name == nameObject.name
    }

    persons.forEach(person => {
      
      if (checkName(person) == true) {
        inBook = true
        return inBook
      }
    })

    if (inBook) {   
      window.alert(`${newName} is already added in phonebook`)
      return
    }

    setPersons(persons.concat(nameObject))

    setNewName('')
    setNewNumber('')

  }

  const handleNewName = (event) => {  
    setNewName(event.target.value)
  }

  const handleNewNumber = (event => {
    setNewNumber(event.target.value)
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
          value = {newName}
          onChange = {handleNewName}
            />
        </div>
        <div>
          number: <input
          value = {newNumber}
          onChange = {handleNewNumber} 
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
        <Person key = {person.name} name = {person.name} number = {person.number}/>)}
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
