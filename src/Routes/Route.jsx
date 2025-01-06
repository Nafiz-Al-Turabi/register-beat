import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import Settings from "../Pages/Settings";
import PlanPurchase from "../Pages/PlanPurchase/PlanPurchase";
import RegisterBeat from "../Pages/RegisterBeat";
import DashboardContents from "../Components/DashboardContents/DashboardContents";
import MyBeats from "../Pages/MyBeats/MyBeats";
import Profile from "../Pages/Profile/Profile";
import SongMatches from "../Pages/SongMatches/SongMatches";
import Protected from "../Private/Protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: '/',
                element:<Protected  role={['admin', 'user']}> <DashboardContents /></Protected>
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
            {
                path: '/song-matches',
                element: <SongMatches />
            },
            {
                path: '/profile',
                element: <Profile />
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