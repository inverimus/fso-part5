import PropTypes from 'prop-types'

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  const toggleVisibility = () => {
    props.setVisible(!props.visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id='create-form-show'>{props.buttonShowLabel}</button>
      </div>
      <div className='details' style={showWhenVisible}>
        <div>
          {props.children}
          <button onClick={toggleVisibility}>{props.buttonHideLabel}</button>
        </div>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  visible: PropTypes.bool.isRequired,
  buttonShowLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired
}

export default Togglable