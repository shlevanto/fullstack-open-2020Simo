import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <form onSubmit = {handleLogin}>
      <h2>Login</h2>
      <div>
        username
          <input
          type = "text"
          value = {username} 
          name = "Username"
          onChange = {({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, '+', password)
    
    try {
      const user = await loginService.login({
        username, password,
      })
    
    setUser(user)
    setUsername('')
    setPassword('')

    console.log(user)
    
    } catch (exception) {
      setErrorMessage('incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      
    }
    
  }

  return (
  <div>
    <h1>Bloglist</h1>
    
    <Notification message = {errorMessage} />
    
    {user === null ?
     loginForm() :

     <div>
       <p>{user.name} logged in</p>
       <h2>blogs</h2>
       {blogs.map(blog =>
       <Blog key={blog.id} blog={blog} />
       )}
     </div>
    }

  </div>
  )
}

export default App