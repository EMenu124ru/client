import { useGetMeQuery } from "@store/auth/api";
import { FC, PropsWithChildren } from "react";

/**
 * Auth guard.
 */
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    useGetMeQuery();

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
