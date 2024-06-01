import { selectIsAuth } from "@store/auth/selectors";
import { useAppSelector } from "@store/store";
import { FC, memo } from "react";
import { Navigate, Outlet, To } from "react-router-dom";

/**
 * Auth guard.
 */
export const NoAuthGuard: FC = memo(() => {
    const isAuthorized = useAppSelector(selectIsAuth);
    if (isAuthorized) {
        const redirect: To = {
            pathname: "menu",
        };
        return <Navigate to={redirect} replace />;
    }
    return <Outlet />;
});
