import {Link} from "react-router-dom";
import axiosClient from "../axiosClient.js";
import {useRef, useState} from "react";

export default function Login() {

    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();
        // const payload = {
        //     name: nameRef.current.value,
        //     email: emailRef.current.value,
        //     password: passwordRef.current.value,
        //     password_confirmation: confirmPasswordRef.current.value
        // }
        // axiosClient.post('/signup', payload)
        //     .then(({data}) => {
        //         setUser(data.user),
        //             setToken(data.token)
        //     })
        //     .catch(err => {
        //         const response = err.response;
        //         if(response && response.status === 422) {
        //             setErrors(response.data.errors);
        //         }
        //     })
    }

    return (
        <div className="login-form">
            <form onSubmit={onSubmit}>
                <h2>Login</h2>

                {
                    errors &&
                    <div className="signup-errors">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }

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
