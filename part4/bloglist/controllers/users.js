const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const body = req.body

  console.log(body.password)
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  console.log(passwordHash)
  
  const user = new User({
    username: body.username,
    name: body.name,
    passWordHash: passwordHash
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

// hae kaikki käyttäjät
usersRouter.get('/', async (req, res) => {
  
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter