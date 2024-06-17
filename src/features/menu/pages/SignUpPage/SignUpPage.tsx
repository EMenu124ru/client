import Dish from "@assets/images/dish-image.png";
import { SignUpForm } from "@features/menu/components/SignUpForm/SignUpForm";
import { Grid } from "@mui/material";
import { GreetingText } from "features/menu/components/GreetingText";
import { SignUpBackgroundLayout } from "features/menu/components/SignUpBackgroundLayout";
import React, { FC, memo } from "react";

import styles from "./SignUpPage.module.scss";

/**
 * Sign up page.
 */
const SignUpPageComponent: FC = () => (
    <SignUpBackgroundLayout>
        <Grid
            className={styles.signUpForm}
            container
            spacing={8}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={6} md={4}>
                <SignUpForm />
            </Grid>
            <Grid item xs={4} sx={{ display: { xs: "none", md: "block" } }}>
                <img src={Dish} alt="No source :(" className={styles.dishImage} />
            </Grid>
            <Grid sx={{ display: { xs: "none", md: "block" } }} item xs={6} md={4}>
                <GreetingText />
            </Grid>
        </Grid>
    </SignUpBackgroundLayout>
);

export const SignUpPage = memo(SignUpPageComponent);
