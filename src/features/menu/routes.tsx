import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const MenuPage = lazy(() => import("./pages/MenuPage").then((module) => ({ default: module.MenuPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const SignUpPage = lazy(() => import("./pages/SignUpPage").then((module) => ({ default: module.SignUpPage })));
export const menuRoutes: RouteObject[] = [
    {
        path: "menu",
        element: <MenuPage />,
    },
];

export const authRoutes: RouteObject[] = [
    {
        path: "auth",
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignUpPage />,
            },
            {
                path: "",
                element: <Navigate to="login" />,
            },
            {
                path: "*",
                element: <Navigate to="login" />,
            },
        ],
    },
];
