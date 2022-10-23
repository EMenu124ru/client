import { FC, PropsWithChildren } from 'react';
import './LoginBackgroundLayout.scss';

/**
 * Children inside component.
 * @param children Children components.
 */
export const LoginBackgroundLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="auth__black_shape_background-login">
    <div className="auth__orange_background-login">
      {children}
    </div>
  </div>
);
