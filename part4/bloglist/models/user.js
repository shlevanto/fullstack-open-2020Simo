const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passWordHash: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passWordHash
  }
})


userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User