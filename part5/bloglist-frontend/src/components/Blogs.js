import React from 'react'
import Blog from './Blog'

const Blogs = ( { blogs, update, loggedUser, likeBlog } ) => {


  return (
    <>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          update={update}
          loggedUser={loggedUser}
          likeBlog={likeBlog}
        />
      )}
    </>
  )
}

export default Blogs