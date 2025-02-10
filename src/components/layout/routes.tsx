import  { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../../hooks/ProtectedRoute';
import PrivateRoute from '../../hooks/PrivateRoute';

// Lazy-loaded components
const Home = lazy(() => import('../../pages/Home'));
const Blog = lazy(() => import('../../pages/Blog'));
const Login = lazy(() => import('../../pages/Login'));
const Signup = lazy(() => import('../../pages/Signup'));
const ForgotPassword = lazy(() => import('../../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../../pages/ResetPassword'));
const Dashboard = lazy(() => import('../../pages/login/pages/Dashboard'));
const User = lazy(() => import('../../pages/login/pages/User'));
const Reels = lazy(() => import('../../pages/Reels'));
const Blogger = lazy(() => import('../../blogger/Blogger'));

export const appRoutes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <ProtectedRoute><Login /></ProtectedRoute> },
  { path: '/signup', element: <ProtectedRoute><Signup /></ProtectedRoute> },
  { path: '/forgot-password', element: <ProtectedRoute><ForgotPassword /></ProtectedRoute> },
  { path: '/reset-password', element: <ProtectedRoute><ResetPassword /></ProtectedRoute> },
  {path: '/reels', element: <Reels/>},
  { path: '/blog', element: <Blog /> },

  // Protected routes

  { path: '/account/*', element: <PrivateRoute><Dashboard /></PrivateRoute> },
  { path: '/settings', element: <PrivateRoute><User/></PrivateRoute> },
  { path: '/write', element: <PrivateRoute><Blogger/></PrivateRoute>}
];
