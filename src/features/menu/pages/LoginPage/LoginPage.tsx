import Dish from "@assets/images/dish-image.png";
import { Grid } from "@mui/material";
import { GreetingText } from "features/menu/components/GreetingText";
import { LoginBackgroundLayout } from "features/menu/components/LoginBackgroundLayout";
import { LoginForm } from "features/menu/components/LoginForm";
import React, { FC, memo } from "react";

import styles from "./LoginPage.module.scss";

/**
 * Login page component.
 */
const LoginPageComponent: FC = () => (
    <LoginBackgroundLayout>
        <Grid
            className={styles.gridForm}
            container
            spacing={8}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item sx={{ display: { xs: "none", md: "block" } }} xs={6} md={4}>
                <GreetingText />
            </Grid>
            <Grid item xs={4} sx={{ display: { xs: "none", md: "block" } }}>
                <img src={Dish} alt="No source :(" className={styles.dishImage} />
            </Grid>
            <Grid item xs={6} md={4}>
                <LoginForm />
            </Grid>
        </Grid>
    </LoginBackgroundLayout>
);

export const LoginPage = memo(LoginPageComponent);
