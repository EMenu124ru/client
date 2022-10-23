import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'signup',
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <Navigate to="signup" />,
      },
      {
        path: '',
        element: <Navigate to="signup" />,
      },
      {
        path: '*',
        element: <Navigate to="signup" />,
      },
    ],
  },

];
