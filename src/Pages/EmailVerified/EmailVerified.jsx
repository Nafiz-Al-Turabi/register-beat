import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Axios/AxiosInstance";

const EmailVerified = () => {
  const { token } = useParams();
  const cleanedToken = token.startsWith(":") ? token.slice(1) : token;
  console.log(token)
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const emailVerified = async () => {
      try {
        await axiosInstance.get(`/users/verify-email/${cleanedToken}`);
        setMessage("Email verified! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      } catch (error) {
        setMessage("Invalid or expired link.");
      }
    };

    emailVerified();
  }, [token, navigate]);

  return <div>{message}</div>;
};

export default EmailVerified;


// export default EmailVerified;
