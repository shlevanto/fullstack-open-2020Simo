const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const test_helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

describe('when there is initially one user in the db', () => {
  
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
  })

  // testit jää jumiin jos tietokantayhteytt ei sulje
  afterAll(done => {
    mongoose.connection.close()
    done()
  })

  test('create user with new username', async () => {
    const usersAtStart = await test_helper.usersInDb()

    console.log(usersAtStart)
    
    const newUser = {
      username: 'spongebob',
      name: 'Paavo Pesusieni',
      password: 'bikinibottom'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)

  })

  test('require unique username', async () => {
    const usersAtStart = await test_helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Rooty Mc Rootyface',
      password: 'heimlich',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)  
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await test_helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})