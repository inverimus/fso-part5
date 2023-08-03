import PropTypes from 'prop-types'

const Togglable = (props) => {

  const inline = props.inline ? 'inline' : ''

  const hideWhenVisible = { display: props.visible ? 'none' : inline }
  const showWhenVisible = { display: props.visible ? inline : 'none' }

  const toggleVisibility = () => {
    props.setVisible(!props.visible)
  }

  const displayInline = { display: inline }

  return (
    <div style={displayInline}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonShowLabel}</button>
      </div>
      <div className='details' style={showWhenVisible}>
        {props.inline
          ? <div style={displayInline}>
              <button onClick={toggleVisibility}>{props.buttonHideLabel}</button>
              {props.children}
            </div>
          : <div style={displayInline}>
              {props.children}
              <button onClick={toggleVisibility}>{props.buttonHideLabel}</button>
            </div>
        }
      </div>
    </div>
  )
}

Togglable.propTypes = {
  inline: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  buttonShowLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired
}

export default Togglable