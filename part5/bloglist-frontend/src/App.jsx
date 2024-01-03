import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
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
  const [like, setLike] = useState('')
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
    console.log(blogs)
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
        setUsername('')
        setPassword('')
      }, 3000)
    }

  }

  const handleCancel = (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
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
    BlogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(newblog)
    setBlogs([...blogs, createdBlog])
    setNotification(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)


    setAuthor('')
    setTitle('')
    setUrl('')
  }
  const handleKeyPress = (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
      handleLogin(event)

    }
  }

  const updateBloglikes = async (newBlog) => {

    const updatedBlog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: newBlog.user.id, // Use only the user ID
      id: newBlog.id,
    }
    await blogService.update(updatedBlog)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const deletebBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    }
  }

  const BlogFormRef = useRef()


  const blogForm = () => (
    <div>
      <h1>blogs</h1>
      <div>
        {notification && <Notification message={notification} classname='notification' />}
      </div>

      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <br />
      <br />
      <div>
        <Togglable buttonLabel="create new blog" ref={BlogFormRef}>
          <BlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handleCreate={handleCreate}
          />
        </Togglable>
        <br />
        {blogs.filter(blog => blog.user !== undefined && blog.user !== null).filter(blog => blog.user.username === user.username).sort((a, b) => {
          return -(a.likes - b.likes)
        }).map(blog =>

          <Blog key={blog.id} blog={blog} updateBlog={updateBloglikes} deletebBlog={deletebBlog} />
        )}
      </div>
    </div>
  )

  const loginForm = () => (

    <LoginForm
      errorMessage={errorMessage}
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleCancel={handleCancel}
    />

  )

  return (
    <div>
      {user === null ? (
        loginForm()
      ) :
        blogForm()
      }
    </div>
  )


}


export default App