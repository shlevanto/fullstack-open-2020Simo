const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const listWithOneBlog = [
  {
    _id: '1',
    title: 'The one item test blog',
    author: 'Testy McTestyface',
    url: 'www.testland.te',
    likes: 5,
    __v: 0
  }
]

const totalLikes = (blogs) => {
  const reducer = (sum, likes) => {
    
    return sum + likes
  }
  
  return blogs.length === 0
    ? 0
    : blogs
      .map(blog => blog.likes)
      .reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, likes) => {
    return Math.max(max, likes)
  }
  

  const mostLikes = blogs
    .map(blog => blog.likes)
    .reduce(reducer, 0)
  
  return blogs.length === 0
    ? 'No blogs' 
    : blogs
      .filter(blog => blog.likes === mostLikes)[0]

}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'No blogs'
  }
  
  const blogsByMostActiveAuthor = _
    .orderBy(_.groupBy(blogs, 'author'),'length','desc')[0]
  
    
  const authorWithMostBlogs = {
    author: blogsByMostActiveAuthor[0].author,
    blogs: blogsByMostActiveAuthor.length
  }
  
  return authorWithMostBlogs
    
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'No blogs'
  }

  const blogsByAuthor = _
    .orderBy(_.groupBy(blogs, 'author'),'length','desc')
  
  const reducer = (sum, likes) => {
    return sum + likes
  }
  
  let authorsAndLikes = []

  blogsByAuthor.forEach(a => {
    const sumOfLikes = a.map(blog => blog.likes).reduce(reducer,0)
    const author = a.map(blog => blog.author)

    authorsAndLikes = authorsAndLikes.concat(
      {
        author: author,
        likes: sumOfLikes
      } 
    )
  })

  
  const mostLikedAuthor = _
    .orderBy(authorsAndLikes, 'likes', 'desc')[0]

  return (
    {
      author: mostLikedAuthor.author[0],
      likes: mostLikedAuthor.likes
    }
  )
  

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}