import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true)

useEffect(() => {
  // tehokkaampi tapa, nyt tässä tulee vielä palautuksena
  // suoraan response.data
  noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  
  // turhaa copypastea
    /*
  axios
  .get('http://localhost:3001/notes')
  .then(response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }) 
  */

},[])


const handleNoteChange = (event) => {
  setNewNote(event.target.value)
}

const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() > 0.5,
  }

  noteService
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  
  /*
  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
    })
  */
  
}

const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

const toggleImportanceOf = id => {
  console.log(`importance of ${id} needs to be toggled`)
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important}

  noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note !== id ? note : returnedNote))
    })
    .catch(error => {
      alert(
        `the note ${note.content} was already deleted from the server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  
    /*
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = {...note, important: !note.important}

  axios
    .put(url, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
      console.log(response.data)
   
    })
  */


  
  
}
    return (
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important': 'all'}
          </button>
        </div>
        
        <ul>
          {notesToShow.map(note => 
            <Note 
            key={note.id} 
            note = {note}
            toggleImportance = {() => toggleImportanceOf(note.id)} />
          )}
        </ul>
        <form onSubmit = {addNote}>
          <input 
            value = {newNote}
            onChange={handleNoteChange}
            />
          <button type = "submit"> save</button>
        </form>
      </div>
    )
  }

  export default App
  