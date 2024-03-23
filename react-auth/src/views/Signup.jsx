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
        };
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
        <div className="container">
            <div className="row justify-content-center pt-5">
                <div className="col-6 align-self-center">
                    <div className="signup-form">
                        <form onSubmit={onSubmit}>
                            <h2 className="text-center">Signup</h2>

                            {
                                errors &&
                                <div className="alert alert-warning">
                                    {Object.keys(errors).map(key => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))}
                                </div>
                            }
                            <input type="text" ref={nameRef} className="form-control form-control-lg mt-5" placeholder="Full Name" />
                            <input type="text" ref={emailRef} className="form-control form-control-lg mt-3" placeholder="Email" />
                            <input type="password" ref={passwordRef} className="form-control form-control-lg mt-3" placeholder="Password" />
                            <input type="password" ref={confirmPasswordRef} className="form-control form-control-lg mt-3" placeholder="Confirm password" />
                            <div className="row">
                                <div className="col-md-7 mt-3">
                                    <button type="submit" className="btn btn-primary">Signup</button>
                                </div>
                                <div className="col-md-5 mt-3">
                                    <p className="message">
                                        Already Registered? <Link to="/login" class="btn btn-dark">Login</Link>
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
