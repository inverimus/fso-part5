import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  
  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const setSuccessMessage = (message) => {
    setMessage({ type: 'success', text: message })
    setTimeout(() => { setMessage(null) }, 5000)
  }

  const setErrorMessage = (message) => {
    setMessage({ type: 'error', text: message })
    setTimeout(() => { setMessage(null) }, 5000)
  }

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setBlogFormVisible(false)
      setSuccessMessage(`Added new blog: ${blog.title} by ${blog.author}`)
    } catch (exception) {
      console.log(exception)
      if (exception.response.status === 401) {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        setErrorMessage('You have been logged out')
      } else if (exception.response.status === 400) {
        setErrorMessage(exception.response.data.error)
      }
    }
  }

  const handleLike = async (blog) => {
    try {
      const newLikes = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const updatedBlog = await blogService.like(blog.id, newLikes)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Really remove ${blog.title}?`)) {
      return
    }

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (exception) {
      console.log(exception)
      if (exception.response.status === 401) {
        if (exception.response.data.error.includes('expired')) {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
          setErrorMessage('You have been logged out')
        } else {
          setErrorMessage(exception.response.data.error)
        }
      } else if (exception.response.status === 400) {
        setErrorMessage(exception.response.data.error)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <LoginForm handleLogin={handleLogin}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} signed in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonShowLabel='create new blog' buttonHideLabel='cancel' visible={blogFormVisible} setVisible={setBlogFormVisible}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleRemove={() => handleRemove(blog)} user={user}/>
      )}
    </div>
  )
}

export default App