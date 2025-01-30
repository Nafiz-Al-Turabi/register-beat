import { createBrowserRouter } from "react-router-dom";
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
import Payment from "../Pages/Payment/Payment";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import Users from "../Pages/Users/Users";
import AdminHome from "../Pages/AdminHome/AdminHome";
import NotFound from "../Pages/NotFound/NotFound";
import Contact from "../Pages/Contact";
import AdminContact from "../Pages/AdminDashboard/AdminContact";
import Transactions from "../Pages/AdminDashboard/Transactions";
import UserDetails from "../Pages/UserDetails/UserDetails";
import SearchBeat from "../Pages/SearchBeat/SearchBeat";

const protectedRoute = (element, roles) => (
  <Protected role={roles}>{element}</Protected>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: protectedRoute(<DashboardLayout />, ["admin", "user"]),
    errorElement: <NotFound></NotFound>,
    children: [
      { path: "/", element: <DashboardContents /> },
      { path: "/settings", element: <Settings /> },
      { path: "/upgrade", element: <PlanPurchase /> },
      { path: "/register-beat", element: <RegisterBeat /> },
      { path: "/my-beats", element: <MyBeats /> },
      { path: "/song-matches", element: <SongMatches /> },
      { path: "/profile", element: <Profile /> },
      { path: "/contact", element: <Contact /> },
      { path: "/search-beat", element: <SearchBeat /> },
    ],
  },
  { path: "/payment", element: protectedRoute(<Payment />, ["user", "admin"]) },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin-dashboard",
    element: protectedRoute(<AdminDashboard />, ["admin"]),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <UserDetails /> },
      { path: "allcontact", element: <AdminContact /> },
      { path: "transections", element: <Transactions /> },
    ],
  },
]);
