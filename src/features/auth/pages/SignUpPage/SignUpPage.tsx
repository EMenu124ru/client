import React, { FC, memo } from 'react';
import { Grid } from '@mui/material';
import { GreetingText } from '@features/auth/components/GreetingText';
import Dish from '@assets/images/dish-image.png';
import { SignUpBackgroundLayout } from '@features/auth/components/SignUpBackgroundLayout';
import './SignUpPage.scss';
import { SignUpForm } from '@features/auth/components/SignUpForm/SignUpForm';

/**
 * Sign up page.
 */
const SignUpPageComponent: FC = () => (
  <SignUpBackgroundLayout>
    <Grid
      className="auth__grid_form_sigun"
      container
      spacing={8}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6} md={4}>
        <SignUpForm />
      </Grid>
      <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
        <img src={Dish} alt="No source :(" className="auth__image_dish" />
      </Grid>
      <Grid item xs={6} md={4}>
        <GreetingText />
      </Grid>
    </Grid>
  </SignUpBackgroundLayout>
);

export const SignUpPage = memo(SignUpPageComponent);
