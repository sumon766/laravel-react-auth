import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Users />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/users',
                element: <Users />,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },


    {
        path: '*',
        element: <NotFound />
    },
]);

export  default router;
