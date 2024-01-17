
import Notification from './Notification'
import PropTypes from 'prop-types'
const LoginForm = ({ errorMessage, handleLogin, username, setUsername, password, setPassword, handleCancel }) => (
  <div id='loginForm'>
    <Notification message={errorMessage} classname='error' />
    <h1>log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}

        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button> <br />
      <button onClick={handleCancel}>cancel</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired

}

export default LoginForm