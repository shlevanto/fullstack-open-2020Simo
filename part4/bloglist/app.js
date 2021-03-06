const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

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
app.use(middleware.tokenExtractor)
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app