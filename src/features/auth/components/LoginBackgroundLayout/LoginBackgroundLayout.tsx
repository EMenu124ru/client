import { FC, memo, PropsWithChildren } from 'react';
import './LoginBackgroundLayout.scss';
import AuthLogo from '@assets/images/auth-logo.png';

/**
 * Children inside component.
 * @param children Children components.
 */
const LoginBackgroundLayoutComponent: FC<PropsWithChildren> = ({ children }) => (
  <div className="auth__black_shape_background_login">
    <img src={AuthLogo} alt="No source :(" className="auth__logo" />
    <div className="auth__orange_background_login" />
    {children}
  </div>
);

export const LoginBackgroundLayout = memo(LoginBackgroundLayoutComponent);
