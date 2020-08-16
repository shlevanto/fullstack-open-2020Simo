import React from 'react'
import Blog from './blog'

const Blogs = ( {blogs, update} ) => {
  return (
  <>
  {blogs.map(blog =>
    
    <Blog key={blog.id} blog={blog} update={update}/>
    )}

    </>
    )
}



export default Blogs