import React, { FC, memo } from 'react';
import { LoginForm } from '@features/auth/components/LoginForm';
import { LoginBackgroundLayout } from '@features/auth/components/LoginBackgroundLayout';
import { GreetingText } from '@features/auth/components/GreetingText';
import { Grid } from '@mui/material';
import Dish from '@assets/images/dish-image.png';
import styles from './LoginPage.module.scss';

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
      <Grid item xs={6} md={4}>
        <GreetingText />
      </Grid>
      <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
        <img src={Dish} alt="No source :(" className={styles.dishImage} />
      </Grid>
      <Grid item xs={6} md={4}>
        <LoginForm />
      </Grid>
    </Grid>
  </LoginBackgroundLayout>
);

export const LoginPage = memo(LoginPageComponent);
