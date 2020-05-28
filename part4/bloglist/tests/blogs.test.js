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