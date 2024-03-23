import {Outlet, Navigate} from "react-router-dom";
import {useStateContext} from "../Context/ContextProvider.jsx";

export default function DefaultLayout() {

    const {user, token} = useStateContext();

    if(!token) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}
