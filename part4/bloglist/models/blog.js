const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const logger = require('../utils/logger')

const url = process.env.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    logger.info('connected to MongoDB')
    
  )
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })


const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
