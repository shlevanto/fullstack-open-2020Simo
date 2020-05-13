import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import Persons from './components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ Searched, setSearched ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  
  useEffect(() =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })

  },[])

  const addPerson = (event) => { 
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(obj => obj.name ===  newName)) {
      window.alert(`${newName} is already added in phonebook.`)
      return
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNewName = (event) => {  
    setNewName(event.target.value)
  }

  const handleNewNumber = (event => {
    setNewNumber(event.target.value)
  })

  const handleSearched = (event => {
    
    if (Searched !== '') {
      setShowAll(false)
    } 
    
    setSearched(event.target.value)
    
  })

  const personsToShow = showAll
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(Searched.toLowerCase())
    )

  return (
    <div>
      <h1>Phonebook</h1>
      
      <div><FilterForm value = {Searched} onChange = {handleSearched}/></div>
      
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
        <Persons personsToShow = {personsToShow}/>
      </div>
    
    </div>
  )

}


export default App;
