import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import NewCreation from './components/createBlogForm'
import Togglable from './components/togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    updateBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const updateBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => (a.likes >= b.likes) ? -1 : 1)

    setBlogs (blogs)
  }

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

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorType('error')
      setErrorMessage('incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const newBlogFormRef = useRef()

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel="create blog" cancelLabel="cancel" ref={newBlogFormRef}>
        <div>
          <NewCreation
            title = {newBlogTitle}
            author = {newBlogAuthor}
            url = {newBlogUrl}
            handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
            handleSubmit = {handleCreation}
          />
        </div>
      </Togglable>
    )
  }

  const handleLogout = () => {
    setUser('')
    window.localStorage.removeItem('loggedUser')
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    try {

      await blogService.create ({ newBlog })
      setErrorType('notification')
      setErrorMessage(`New blog: ${newBlogTitle} by ${newBlogAuthor} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')

      newBlogFormRef.current.toggleVisibility()

      updateBlogs()


    } catch (exception) {
      setErrorType('error')
      setErrorMessage('Blog title and url can not be blank')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message = {errorMessage} errorType = {errorType} />
      {user === null ? loginForm() :

        <div>
          {user.name} logged in
          <form onSubmit = {handleLogout}>
            <button type="submit">logout</button>
          </form>
          {newBlogForm()}
          <h2>blogs</h2>
          <Blogs
            blogs = {blogs}
            update = {updateBlogs}
            loggedUser = {user}
          />
        </div>
      }

    </div>
  )
}

export default App