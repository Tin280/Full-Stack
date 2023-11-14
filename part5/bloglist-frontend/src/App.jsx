import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      // console.log(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    await setUser(null)
    // window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
  }
  // Handle create
  const handleCreate = async (event) => {
    event.preventDefault()
    const newblog = {
      title: title,
      author: author,
      url: url
    }
    await blogService.create(newblog)
    setNotification(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)


    setAuthor('')
    setTitle('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} classname='error' />
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
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
      </div>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      <Notification message={notification} classname='notification' />
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <br />
      <br />
      <h1>create new</h1>
      title:
      <input
        type='text'
        value={title}
        name='title'
        onChange={({ target }) => setTitle(target.value)}
      /><br />
      author:
      <input
        type='text'
        value={author}
        name='author'
        onChange={({ target }) => setAuthor(target.value)}
      /><br />
      url:
      <input
        type='text'
        value={url}
        name='url'
        onChange={({ target }) => setUrl(target.value)}
      /><br />
      <button onClick={handleCreate}>create</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App