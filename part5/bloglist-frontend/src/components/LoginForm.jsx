
import Notification from "./Notification"
const LoginForm = ({ errorMessage, handleLogin, username, setUsername, password, setPassword }) => (
    <div>
        <Notification message={errorMessage} classname='error' />
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button> <br />
            <button >cancel</button>
        </form>
    </div>
)
export default LoginForm