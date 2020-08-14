import React from 'react'
import Blog from './blog'
import Togglable from './togglable'

const Blogs = ( {blogs} ) => {
  return (
  <>
  {blogs.map(blog =>
    
    <Blog key={blog.id} blog={blog}/>
    )}

    </>
    )
}



export default Blogs