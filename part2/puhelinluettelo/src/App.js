import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import Persons from './components/Persons'
import personService from './services/persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Searched, setSearched] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const updatePersons = () => {
    personService
    .getAll()
    .then(personsNow => {
      setPersons(personsNow)
    })

    setNewName('')
    setNewNumber('')

  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(obj => obj.name === newName)) {
      
      const result = window.confirm(`${newName} is already added in phonebook, replace the old number with a new one?`)
      
      if (result) {
        const id = persons.find(n => n.name === newName).id
        console.log(id)
        
        // update
        personService
          .update(id, personObject)
        updatePersons()
      }
      return
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
      })

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

    if (Searched !== '') {
      setShowAll(false)
    }

    setSearched(event.target.value)

  })

  const delPerson = id => {
    console.log(`delete ${id}`)

    const name = persons.find(p => p.id === id).name

    const result = window.confirm(`Delete ${name}?`)
    
    if (result) {
      personService.remove(id)
      
      
      // ja päivitetään persons
      updatePersons()

    } else {
      console.log(`Ok, will not delete ${name}`)
    }
  }


  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(Searched.toLowerCase())
    )

  return (
    <div>
      <h1>Phonebook</h1>

      <div><FilterForm value={Searched} onChange={handleSearched} /></div>

      <h2>Add a new </h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      <div>
        <Persons 
        personsToShow={personsToShow} 
        delPerson={delPerson} />
      </div>
    </div>
  )

}


export default App;
