import Blog from './Blog'
import Notification from './Notification'
import Togglable from './Togglable'
const BlogForm = ({ notification, user, handleLogout, title, setTitle, author, setAuthor, url, setUrl, handleCreate, blogs }) => (
    <div>
        <h1>blogs</h1>
        <div>
            {notification && <Notification message={notification} classname='notification' />}
        </div>

        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
        <br />
        <br />
        <Togglable>
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
        </Togglable>

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </div>
)

export default BlogForm