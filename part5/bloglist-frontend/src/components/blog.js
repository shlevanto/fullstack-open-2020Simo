import React from 'react'
import Togglable from './togglable'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  marginBottom: 5
}

const Blog = ({ blog }) => {
  
  return (
    <div style={blogStyle}>
    <div>
      {blog.title} 
      {blog.author}
    <div>
      <Togglable buttonLabel="view" cancelLabel="hide">
        <p>{blog.likes} <button>like</button></p>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
      </Togglable>
    </div>
    </div>
  </div>
  )
  }

export default Blog
