import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import Settings from "../Pages/Settings";
import PlanPurchase from "../Pages/PlanPurchase/PlanPurchase";
import RegisterBeat from "../Pages/RegisterBeat";
import DashboardContents from "../Components/DashboardContents/DashboardContents";
import MyBeats from "../Pages/MyBeats/MyBeats";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: '/',
                element: <DashboardContents />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/upgrade',
                element: <PlanPurchase />
            },
            {
                path: '/register-beat',
                element: <RegisterBeat />
            },
            {
                path: '/my-beats',
                element: <MyBeats />
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