const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')

const url = config.url

logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    logger.info('connected to MongoDB')
    
  )
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/', blogsRouter)
app.use('/api/users', usersRouter)
module.exports = app