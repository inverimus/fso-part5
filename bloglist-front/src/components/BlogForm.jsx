import { useState } from 'react'

import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    createBlog({ title: title, author: author, url: url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input type="text" value={title} onChange={({target}) => setTitle(target.value)} data-testid='title'/>
      </div>
      <div>
        author:
        <input type="text" value={author} onChange={({target}) => setAuthor(target.value)} data-testid='author'/>
      </div>
      <div>
        url:
        <input type="text" value={url} onChange={({target}) => setUrl(target.value)} data-testid='url'/>
      </div>
      <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm