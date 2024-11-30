import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PlansBills from "../Pages/Plans&Bills/PlansBills";
import DashboardLayout from "../Layout/DashboardLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            // {
            //     path: '/',
            //     element: <Home />
            // },
            {
                path: '/plan-bills',
                element: <PlansBills />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
]);