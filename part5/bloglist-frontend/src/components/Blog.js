import React, { useState } from 'react'
import blogService from '../services/blogs'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  marginBottom: 5
}


const Blog = ({ blog, update, loggedUser, likeBlog }) => {

  const [visibility, setVisibility] = useState(false)
  const hideWhenVisible = { display: visibility ? 'none': '' }
  const showWhenVisibile = { display: visibility ? '' : 'none' }

  const removeBlog = async () => {

    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {

      const newObject = {
        token: loggedUser.token,
        id: blog.id
      }

      try {
        await blogService.remove(newObject)
        update()
      } catch (exception) {
        console.log(exception)
      }
    }

  }

  const toggle = () => {
    setVisibility(!visibility)
    return
  }

  const handleLike = () => {
    likeBlog(blog)
  }

  const comma = ', '

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog'>
        {blog.title}
        {comma}
        {blog.author}
        <button onClick={toggle}>view</button>
      </div>
      <div style={showWhenVisibile} className='details'>
        {blog.title}
        {comma}
        {blog.author}
        <button onClick={toggle}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes}
        <button onClick={handleLike}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        {loggedUser.username === blog.user.username
          ? <button onClick={removeBlog}>remove</button> : '' }
      </div>
    </div>
  )

}

export default Blog
