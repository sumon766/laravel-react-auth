import {Link} from "react-router-dom";

export default function Login() {

    const onSubmit = (ev) => {
        ev.preventDefault()
    }

    return (
        <div className="login-form">
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <input type="text" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    )
}
