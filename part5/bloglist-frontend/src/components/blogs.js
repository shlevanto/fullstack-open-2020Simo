import React from 'react'
import Blog from './blog'

const Blogs = ( {blogs, update, loggedUser} ) => {
  return (
    <>
    {blogs.map(blog =>
    
    <Blog 
      key={blog.id} 
      blog={blog} 
      update={update} 
      loggedUser={loggedUser}
    />
    )}

    </>
  )
}

export default Blogs