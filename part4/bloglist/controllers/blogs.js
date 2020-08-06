const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

// etusivu
blogsRouter.get('/', (req, res) => {
  res.send('<h1>Bloglist</h1>')
})

// hae kaikki blogit
blogsRouter.get('/api/blogs', async (req, res) => {
  logger.info('getting blogs')
  
  await Blog
    .find({}).populate('user', { username: 1, name: 1})
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

// 4.19. tokenin käsittely
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
// lisää blogi
blogsRouter.post('/api/blogs', async (req, res) => {
  const body = req.body

  
  
  // 4.19. blogin lisääminen vaatii validin tokenin, tokenin haltija merkitään lisääjäksi
  // const token = getTokenFrom(req)
  // const decodedToken = jwt.verify(token, process.env.SECRET)
  // 4.20. pitäisi saada toimimaan middlewarella
  
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  
  if(!decodedToken.id) {
    return res.status(401).json({ error: 'invalid or missing token'})
  }

  const user = await User.findById(decodedToken.id)

  // ensimmäinen toiminnallisuus, annetaan kiinteä id
  // const user = await User.findById(body.userId)
  
  // 4.18. lisätään ensimmäisenä tietokannassa oleva user
  // const users = await User.find({})
  // const user = users[0]
  
  // blogilla on oltava otsikko ja url
  if (!body.title || !body.url) {
    res.status(400).end()
    
  }

  !body.likes
    ? body.likes = 0
    : body.likes
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

 
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  res.json(savedBlog.toJSON())
})

// poista blogi
blogsRouter.delete('/api/blogs/:id', async (req, res) => {
  
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(400).end()
  }

  
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  
  console.log('decoded token user: ', decodedToken.id)
  console.log('user for this blog: ', blog.user.toString())
  
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(400).json({ error: 'only use who added blog can remove it' })
  }

  //
})

// muokkaa blogia 
blogsRouter.put('/api/blogs/:id', async (req,res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: body.id
  }
  
  await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
  
  res.json(blog)
})

module.exports = blogsRouter