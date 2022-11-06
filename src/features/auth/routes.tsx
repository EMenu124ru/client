import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignUpPage = lazy(() => import('./pages/SignUpPage').then(module => ({ default: module.SignUpPage })));
export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: '',
        element: <Navigate to="login" />,
      },
      {
        path: '*',
        element: <Navigate to="login" />,
      },
    ],
  },

];
