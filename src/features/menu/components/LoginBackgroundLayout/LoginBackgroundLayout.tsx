import AuthLogo from "@assets/images/auth-logo.png";
import { FC, PropsWithChildren } from "react";

import styles from "./LoginBackgroundLayout.module.scss";

/**
 * Children inside component.
 * @param children Children components.
 */
const LoginBackgroundLayoutComponent: FC<PropsWithChildren> = ({ children }) => (
    <div className={styles.blackBackground}>
        <img src={AuthLogo} alt="No source :(" className={styles.logo} />
        <div className={styles.orangeBackground} />
        {children}
    </div>
);

export const LoginBackgroundLayout = LoginBackgroundLayoutComponent;
