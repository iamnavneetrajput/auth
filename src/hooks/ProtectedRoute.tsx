import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the path accordingly

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token); // Access token from Redux store
  const lastPage = useSelector((state: RootState) => state.lastPage.page); // Last visited page from the Redux state

  useEffect(() => {
    if (token) {
      // If user is logged in and tries to access login or signup, redirect to dashboard or last page
      if (lastPage && !lastPage.includes("login") && !lastPage.includes("signup")) {
        navigate(lastPage || "/account"); // Redirect to the last page if available
      } else {
        navigate("/account"); // Redirect to the dashboard if no previous page is available or if it was a login/signup page
      }
    }
  }, [token, navigate, lastPage]);

  if (!token) {
    // Optionally, you can add a loading spinner or other fallback UI here if needed
    return <>{children}</>;
  }

  // Show a loading indicator or nothing if you're still waiting for token (could be set via Redux state)
  return <div>Loading...</div>; // You can replace this with a custom loader component if you prefer
};

export default ProtectedRoute;
