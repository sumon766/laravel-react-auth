import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import {useStateContext} from "../Context/ContextProvider.jsx";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [errors, setErrors] = useState(null);
    const {setToken, setUser} = useStateContext();


    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value
        }
        axiosClient.post('/signup', payload)
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
        <div className="signup-form">
            <form onSubmit={onSubmit}>
                <h2>Signup</h2>

                {
                    errors &&
                    <div className="signup-errors">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }

                <input type="text" ref={nameRef} placeholder="Full Name" />
                <input type="text" ref={emailRef} placeholder="Email" />
                <input type="password" ref={passwordRef} placeholder="Password" />
                <input type="password" ref={confirmPasswordRef} placeholder="Confirm password" />
                <button type="submit">Signup</button>
                <p className="message">
                    Already Registered? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    )
}
