import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from '@features/auth/routes';
import { menuRoutes } from '@features/menu/routes';

const routes: RouteObject[] = [
  ...authRoutes,
  ...menuRoutes,
  {
    path: '*',
    element: <Navigate to="/auth" />,
  },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
