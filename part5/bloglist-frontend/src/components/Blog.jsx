import { useState } from 'react'
const Blog = ({ blog, updateBlog, deletebBlog, user }) => {
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
    <div style={blogStyle} className='blog'>
      {/* {blog.title} */}
      <div style={showWhenVisible} className='whenShow'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={hideWhenVisible} className='whenHidden'>

        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          <>likes </>{blog.likes} <button onClick={addlike}>like</button>
        </div>
        {user.username} <br />
        <button onClick={() => { deletebBlog(blog) }}>remove</button>
      </div>

    </div>

  )
}
export default Blog