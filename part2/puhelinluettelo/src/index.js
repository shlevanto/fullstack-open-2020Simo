import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ Searched, setSearched ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  
  const Person = (props) => {
    return (
      <p>{props.name} {props.number}</p>
    )
  }

  
  const addPerson = (event) => { 
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log(
      persons.some(obj => obj.name === newName) 
    );

    if (persons.some(obj => obj.name ===  newName)) {
      window.alert(`${newName} is already added in phonebook.`)
      return
    }
    

    setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')

  }

  const handleNewName = (event) => {  
    setNewName(event.target.value)
  }

  const handleNewNumber = (event => {
    setNewNumber(event.target.value)
  })

  const handleSearched = (event => {
    if (Searched === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
    console.log(showAll);
    
    setSearched(event.target.value)
    console.log(Searched);
    
  })

  const personsToShow = showAll
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(Searched.toLowerCase())
    )

  return (
    <div>
      <h1>Phonebook</h1>

      <div>
        filter shown with: <input
        value = {Searched}
        onChange = {handleSearched}
        />
      </div>
      <h2>Add a new </h2>
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
        {personsToShow.map(person =>
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
