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
        <div className="container">
            <div className="row justify-content-center pt-5">
                <div className="col-6 align-self-center">
                    <div className="login-form">
                        <form onSubmit={loginSubmit}>
                            <h2 className="text-center">Login</h2>

                            {
                                errors &&
                                <div className="alert alert-warning">
                                    {Object.keys(errors).map(key => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))}
                                </div>
                            }

                            <input type="email" ref={emailRef} className="form-control form-control-lg mt-5" placeholder="Email" />
                            <input type="password" ref={passwordRef} className="form-control form-control-lg mt-3" placeholder="Password" />
                            <div className="row">
                                <div className="col-md-5 mt-3">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                                <div className="col-md-7 mt-3">
                                    <p className="message">
                                        Not Registered? <Link to="/signup" class="btn btn-dark">Create an account</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
