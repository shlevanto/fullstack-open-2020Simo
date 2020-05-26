const dummy = (blogs) => {
  return 1
}

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

  const mostLikes = (blogs) => {
    blogs
      .map(blog => blog.likes)
      .reduce(reducer, 0)
  }

  return(
    blogs
      .filter(blog => blog.likes === mostLikes)
  )

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}