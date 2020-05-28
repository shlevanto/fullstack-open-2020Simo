const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

afterAll(done => {
  mongoose.connection.close()
  done()
})

test('get all blogs returns right amount of blogs in JSON format', async () => {
  const response = await api.get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id field is named "id"', async () => {
  const response = await api.get('/api/blogs/')
  
  const firstBlog = response.body[0]

  expect(firstBlog.id).toBeDefined()
})


describe('adding blogs', () => {
  test('blog gets added to database', async () => {
    const newBlog = {
      title: 'How to add new blogs', 
      author: 'Simo Levanto', 
      url: 'http://someadress.com/howTo', 
      likes: 2, 
      __v: 0 
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContainEqual(newBlog.title)
  })

  test('if blog with no likes is added, likes value is set to 0', async () => {
    const newBlog = {
      title: 'How to add new blogs', 
      author: 'Simo Levanto', 
      url: 'http://someadress.com/howTo', 
      __v: 0 
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const recentlyAdded = blogsAtEnd.filter(b => b.title === newBlog.title)[0]
    
    expect(recentlyAdded.likes).toBe(0)
  })
})