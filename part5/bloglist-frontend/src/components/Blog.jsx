import { useState } from 'react'
const Blog = ({ blog, updateBlog, deletebBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addlike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(newBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility} style={showWhenVisible}>view</button>
      <button onClick={toggleVisibility} style={hideWhenVisible}>hide</button>
      <div style={hideWhenVisible}>
        {blog.url}
        <div>
          {blog.likes} <button onClick={addlike}>like</button>
        </div>
        {blog.author} <br />
        <button onClick={() => { deletebBlog(blog) }}>remove</button>
      </div>

    </div>

  )
}
export default Blog