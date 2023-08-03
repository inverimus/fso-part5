import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showDetails = { display: detailsVisible ? '' : 'none' }
  const showRemoveButton = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => setDetailsVisible(!detailsVisible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} id='details-button'>{detailsVisible ? 'hide' :'view'}</button>
      <div className='details' style={showDetails}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button id='like-button' onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <div style={showRemoveButton}><button id='remove-button' onClick={handleRemove}>remove</button></div>
      </div>
    </div>
)}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog