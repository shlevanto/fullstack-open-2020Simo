import React, { useState } from 'react'
import Togglable from './togglable'
import blogService from '../services/blogs'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  marginBottom: 5
}

const Blog = ({ blog,update }) => {
 
  const likeBlog = async () => {
  
    console.log(blog)
      
      const likedBlog = {
         title: blog.title,
         likes: blog.likes + 1,
         author: blog.author,
         url: blog.url,
         id: blog.id,
         user: blog.user.id
       }
     
       try {
         await blogService.update(likedBlog, blog.id)
         update()
       } catch (exception){

       }
  }

  return (
    <div style={blogStyle}>
    <div>
      {blog.title} 
      {blog.author}
    <div>
      <Togglable buttonLabel="view" cancelLabel="hide">
        <p>{blog.likes}</p> 
        <button onClick={likeBlog}>like</button>
        <p>{blog.url}</p>
        <p>{blog.user.name}</p>
      </Togglable>
    </div>
    </div>
  </div>
  )
  }

export default Blog
