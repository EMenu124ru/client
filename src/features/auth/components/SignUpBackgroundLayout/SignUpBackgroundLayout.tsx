import { FC, memo, PropsWithChildren } from 'react';
import AuthLogo from '@assets/images/auth-logo.png';
import styles from './SignUpBackgroundLayout.module.scss';

/**
 * Sign up background layout.
 * @param children Children components.
 */
export const SignUpBackgroundLayoutComponent: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.blackBackground}>
    <img src={AuthLogo} alt="No source :(" className={styles.logo} />
    <div className={styles.orangeBackground} />
    {children}
  </div>
);

export const SignUpBackgroundLayout = memo(SignUpBackgroundLayoutComponent);
