import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input 
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input 
          type="password" 
          value={password} 
          name="Password" 
          id="password" 
          onChange={({target}) => setPassword(target.value)} 
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
