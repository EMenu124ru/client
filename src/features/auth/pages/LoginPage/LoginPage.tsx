import React, { FC, memo } from 'react';
import { Box, Button, TextField } from '@mui/material';
import './LoginPage.scss';
import { LoginBackgroundLayout } from '../../components/LoginBackgroundLayout/LoginBackgroundLayout';

/**
 * Login page component.
 */
const LoginPageComponent: FC = () => (
  <LoginBackgroundLayout>
    <Box
      className="auth__box_buttons"
    >
      <TextField
        className="auth__input-text"
        required
        placeholder="Номер телефона"
      />
      <TextField
        className="auth__input-text"
        required
        placeholder="Пароль"
      />
      <Button
        className="auth__button-enter"
        variant="authMain"
      >
        Войти
      </Button>
      <Button>
        Регистрация
      </Button>
    </Box>
  </LoginBackgroundLayout>
);

export const LoginPage = memo(LoginPageComponent);
