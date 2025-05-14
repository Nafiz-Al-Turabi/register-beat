import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import Settings from "../Pages/Settings";
import PlanPurchase from "../Pages/PlanPurchase/PlanPurchase";
import RegisterBeat from "../Pages/RegisterBeat";
import DashboardContents from "../Components/DashboardContents/DashboardContents";
import MyBeats from "../Pages/MyBeats/MyBeats";
import AllMatchesSong from "../Pages/AllMatchesSong/AllMatchesSong"
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
import PaypalLoading from "../Components/PaypalLoading/PaypalLoading";
import TermOfUse from "../Pages/TermOfUse/TermOfUse";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import LandingPage from "../Pages/LandingPage/LandingPage";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Pricing from "../Pages/Pricing/Pricing";
import LandingLayout from "../Layout/landingLayout";
import VerifyAccount from "../Pages/VerifyAccount/VerifyAccount";
import EmailVerified from "../Pages/EmailVerified/EmailVerified";
import EnglishTemplate from "../Pages/MessageTemplate/EnglishTemplate";
import SpanishTemplate from "../Pages/MessageTemplate/SpanishTemplate";
import Addon from "../Components/Addonpage/Addon";

const protectedRoute = (element, roles) => (
  <Protected role={roles}>{element}</Protected>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />, 
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: protectedRoute(<DashboardLayout />, ["admin", "user"]),
    errorElement: <NotFound />,
    children: [
      { path: "", element: <DashboardContents /> }, 
      { path: "settings", element: <Settings /> },
      { path: "upgrade", element: <PlanPurchase /> },
      { path: "register-beat", element: <RegisterBeat /> },
      { path: "my-beats", element: <MyBeats /> },
      {path: "all-matches-song", element:<AllMatchesSong/>},
      { path: "song-matches", element: <SongMatches /> },
      { path: "profile", element: <Profile /> },
      { path: "contact", element: <Contact /> },
      { path: "search-beat", element: <SearchBeat /> },
      {path: "english-template" , element :<EnglishTemplate/>},
      {path: "spanish-template" , element :<SpanishTemplate/>},
    ],
  },
  {
    path: "/payment",
    element: protectedRoute(<Payment />, ["user", "admin"]),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verify-account",
    element: <VerifyAccount />,
  },
  {
    path: "/Add-on",
    element: <Addon />,
  },
  {
    path: "/api/users/verify-email/:token",
    element: <EmailVerified />,
  },
  {
    path: "/payment-checking",
    element: <PaypalLoading />,
  },
  {
    path: "/term-of-use",
    element: <TermOfUse />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  
  {
    path: "/admin-dashboard",
    element: protectedRoute(<AdminDashboard />, ["admin"]),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <UserDetails /> },
      { path: "allcontact", element: <AdminContact /> },
      { path: "transactions", element: <Transactions /> },
    ],
  },
]);