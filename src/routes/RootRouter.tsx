import { authRoutes, menuRoutes } from "@features/menu/routes";
import { FC, lazy } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const AuthGuard = lazy(() => import("./guards/AuthGuard").then((module) => ({ default: module.AuthGuard })));
const NoAuthGuard = lazy(() => import("./guards/NoAuthGuard").then((module) => ({ default: module.NoAuthGuard })));

const routes: RouteObject[] = [
    {
        element: <NoAuthGuard />,
        children: [...authRoutes],
    },
    {
        element: <AuthGuard />,
        children: [...menuRoutes],
    },
    {
        path: "*",
        element: <Navigate to="/auth" />,
    },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
