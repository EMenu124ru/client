import { FC, memo, useEffect } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/store';

import { selectIsAuth, selectRefreshLoading } from '@store/auth/selectors';
import { refreshTokens } from '@store/auth/dispatchers';
import { CircularProgress } from '@mui/material';

/**
 * Auth guard.
 */
export const AuthGuard: FC = memo(() => {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(selectIsAuth);
  const isLoading = useAppSelector(selectRefreshLoading);

  const authCheck = () => {
    dispatch(refreshTokens());
  };

  useEffect(() => {
    authCheck();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isAuthorized) {
    const redirect: To = {
      pathname: 'auth/login',
    };
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
});
