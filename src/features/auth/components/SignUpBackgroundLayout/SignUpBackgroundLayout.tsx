import { FC, memo, PropsWithChildren } from 'react';
import './SignUpBackgroundLayout.scss';
import AuthLogo from '@assets/images/auth-logo.png'
export const SignUpBackgroundLayoutComponent: FC<PropsWithChildren> = ({ children }) => (
  <div className="auth__black_shape_background_signup">
    <img src={AuthLogo} alt="No source :(" className="auth__logo" />
    <div className="auth__orange_background_signup" />
    {children}
  </div>
);

export const SignUpBackgroundLayout = memo(SignUpBackgroundLayoutComponent);
