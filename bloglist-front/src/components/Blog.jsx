import { useState } from 'react'
import PropTypes from 'prop-types'

import Togglable from './Togglable'

const Blog = ({ blog, like, remove, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const displayInline = { display: 'inline' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = () => <button onClick={remove}>remove</button>

  return (
    <div style={blogStyle}>
      <div style={displayInline}>
        {blog.title} {blog.author}
        <Togglable inline={true} buttonShowLabel='view' buttonHideLabel='hide' visible={blogVisible} setVisible={setBlogVisible}>
          <div>{blog.url}</div>
          <div>{blog.likes} <button onClick={like}>likes</button></div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && removeButton()}
        </Togglable>
      </div>
    </div>
)}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog