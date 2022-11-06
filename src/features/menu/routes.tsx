import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const MenuPage = lazy(() => import('./pages/MenuPage').then(module => ({ default: module.MenuPage })));

export const menuRoutes: RouteObject[] = [
  {
    path: 'menu',
    element: <MenuPage />,
  },
];
