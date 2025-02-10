import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { RootState, AppDispatch } from "./store";
import Layout from "./components/layout/Layout";
import Loader from "./components/layout/Loader";
import { appRoutes } from "./components/layout/routes"; // Import route config
import { fetchUser } from "./features/auth/authActions";

import "./App.css";
import "./assets/css/style.css";
import "./assets/css/post.css"
import "./assets/css/responsive.css";

const AppRoutes = () => {
  return useRoutes(appRoutes); // Use Routes from react-router
};

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser()); // Fetch user if token exists but user data is missing
    }
  }, [dispatch, token, user]);

  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<Loader />}>
          <Layout>
            <AppRoutes />
          </Layout>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
