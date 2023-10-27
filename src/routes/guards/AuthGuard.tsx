import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@store/store';

import { TokenService } from '@api/services/token';
import { selectIsAuth } from '@store/auth/selectors';

/**
 * Auth guard.
 */
export const AuthGuard: FC = () => {
  const hasToken = TokenService.hasToken();
  const isAuthorized = useAppSelector(selectIsAuth);

  if (!isAuthorized || !hasToken) {
    const redirect: To = {
      pathname: 'auth/login',
    };
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};
