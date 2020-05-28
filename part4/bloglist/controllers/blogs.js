const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

// etusivu
blogsRouter.get('/', (req, res) => {
  res.send('<h1>Bloglist</h1>')
})

// kaikki blogit
blogsRouter.get('/api/blogs', async (req, res) => {
  logger.info('getting blogs')
  
  await Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

// yksittäinen blogi
blogsRouter.get('/api/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if(blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
})

// lisää blogi
blogsRouter.post('/api/blogs', async (req, res) => {
  const body = req.body
  
  !body.likes
    ? body.likes = 0
    : body.likes

  console.log(body.likes)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

 
  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

// poista blogi
module.exports = blogsRouter