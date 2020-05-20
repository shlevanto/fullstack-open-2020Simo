// MongoDB yhteys
require('dotenv').config()
const Person = require('./models/person')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


// Express
const express = require('express')
const app = express()

// JSON parseri
app.use(express.json())


// mahdollistaa frontendin staattisen sisällön lukemisen
app.use(express.static('build'))

// cors sallii cross-origin pyynnöt
const cors = require('cors')
app.use(cors())

// Morgan valvoo http-pyyntöjä
var morgan = require('morgan')

morgan.token('data', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time ms :data'))


// get infopage
app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const count = persons.length
    const time = new Date()

    res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${time}</p>`)
  })
})
// Hae kaikki tiedot
// MongoDB

app.get('/api/persons/', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
    //mongoose.connection.close()
  })
})

// Yksittäisen ihmisen tiedot
// MongoDB

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

// Tietojen poistaminen
// MongoDB
app.delete('/api/persons/:id', (req) => {
  console.log('delete', req.params.id)

  Person.findByIdAndRemove(req.params.id)
    .then(res => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
    })
})

// Tietojen lisääminen
// MongoDB
app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log('tallennetaan', body)

  if (body.name === '') {
    return res.status(400).json({ error: 'name missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => {
      console.log(error)

      return res.status(400).send({error: 'name is in database'})
    })

})

// tiedon päivittäminen
// MongoDB
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true})
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

// virheidenkäsittelijän pitää olla täällä lopussa
const errorHandler = (error, request, response, next) => {
  console.log('virheidenkäsittelijä toimii')

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

// Heroku
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
