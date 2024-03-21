import {Link} from "react-router-dom";
import axiosClient from "../axiosClient.js";
import {useRef, useState} from "react";
import {useStateContext} from "../Context/ContextProvider.jsx";

export default function Login() {
    const [errors, setErrors] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setToken, setUser} = useStateContext();

    const loginSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user),
                    setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
    }

    return (
        <div className="login-form">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>

                {
                    errors &&
                    <div className="signup-errors">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }

                <input type="text" ref={emailRef} placeholder="email" />
                <input type="password" ref={passwordRef} placeholder="Password" />
                <button type="submit">Login</button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    )
}
