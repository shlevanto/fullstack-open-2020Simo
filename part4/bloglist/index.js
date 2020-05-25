const http = require ('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

// etusivu
app.get('/', (req, res) => {
  res.send('<h1>Bloglist</h1>')
})

// kaikki blogit
app.get('/api/blogs', (req, res) => {
  console.log('getting blogs')
  
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

// yksittäinen blogi
app.get('/api/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if(blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
})

// lisää blogi
app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)
  blog  
    .save()
    .then(res => {
      res.status(201).json(res)
    })
})

// poista blogi

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  
})