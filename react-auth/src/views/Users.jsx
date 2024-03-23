import axiosClient from "../axiosClient.js";
import {useState} from "react";
import {useStateContext} from "../Context/ContextProvider.jsx";

export default function Users() {

    const [errors, setErrors] = useState();
    const {user, setUser, setToken} = useStateContext();

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({}),
                    setToken(null)
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
            <div className="row">
                <div className="col mt-5">
                    <div className="alert alert-success mt-5 logout-button" role="alert">
                        Welcome to the page after login. The auth system created with Laravel Sanctum.
                        <form onSubmit={logout}>
                            <button type="button" className="btn btn-danger">Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
