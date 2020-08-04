const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


// hae kaikki käyttäjät
usersRouter.get('/', async (req, res) => {  
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1, likes: 1})
  
  console.log(users[0].id)
  
  res.json(users.map(u => u.toJSON()))
})

// lisää käyttäjä
usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    
    // tarkista että käyttäjätunnus ja salasana ovat valideja
    if (body.password === undefined || body.username === undefined) {
      return res.status(400).json({ error: 'username or password missing'})
    }

    if (body.password.length < 4) {
      return res.status(400).json({ error: 'password too short, min length is 3'})
    }

    // kryptataan salasana
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    console.log(passwordHash)
    
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
  
  } catch (exception) {
    next(exception)
    
  }

})



module.exports = usersRouter