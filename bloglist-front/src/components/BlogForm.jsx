import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, handleCreate }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
      <div>
        title:
        <input type="text" value={title} onChange={({target}) => setTitle(target.value)} />
      </div>
      <div>
        author:
        <input type="text" value={author} onChange={({target}) => setAuthor(target.value)} />
      </div>
      <div>
        url:
        <input type="text" value={url} onChange={({target}) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired
}

export default BlogForm