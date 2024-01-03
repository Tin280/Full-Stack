
const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreate }) => (
  <div>
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


  </div>
)

export default BlogForm