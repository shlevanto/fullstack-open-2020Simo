import React, {useState} from 'react'
import blogService from '../services/blogs'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  marginBottom: 5
}


const Blog = ({ blog, update, loggedUser }) => {
  
  const [visibility, setVisibility] = useState(false)
  const hideWhenVisible = { display: visibility ? 'none': ''}
  const showWhenVisibile = { display: visibility ? '' : 'none'}
  
  const likeBlog = async () => {
  
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

      }
  }

  }

  const toggle = () => {
    setVisibility(!visibility)
    return
  }


  return (
    <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title}
      {blog.author}
      <button onClick={toggle}>view</button>
    </div>
    <div style={showWhenVisibile}>
      {blog.title}
      {blog.author}
      <button onClick={toggle}>hide</button>
      <br/>
      {blog.url}
      <br/>
      {blog.likes}
      <button onClick={likeBlog}>like</button>
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
