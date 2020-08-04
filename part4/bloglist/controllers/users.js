const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  
  try {
    const body = req.body
    
    if (body.password === undefined || body.username === undefined) {
      return res.status(400).json({ error: 'username or password missing'})
    }

    if (body.password.length < 4) {
      return res.status(400).json({ error: 'password too short, min length is 3'})
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
  
  } catch (exception) {
    next(exception)
    
  }

})

// hae kaikki käyttäjät
usersRouter.get('/', async (req, res) => {  
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter