import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../Context/ContextProvider.jsx";

export default function GuestLayout() {

    const {token} = useStateContext();

    if(token) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
