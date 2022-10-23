import { Box, Button, TextField } from '@mui/material';
import React, { FC, memo } from 'react';
import './LoginForm.scss';
import { useNavigate } from 'react-router-dom';

/**
 * Login form.
 */
const LoginFormComponent: FC = () => {
  const navigate = useNavigate();

  /**
   * Sign up button handler.
   */
  const onSignUpButtonClickHandler = (): void => {
    navigate('/auth/signup');
  };

  return (
    <Box
      className="auth__box_buttons"
    >
      <text className="auth__form_text_login">
        Авторизация
      </text>
      <TextField
        className="auth__input_text_login"
        required
        placeholder="Номер телефона"
      />
      <TextField
        className="auth__input_text_login"
        required
        placeholder="Пароль"
      />
      <Button
        className="auth__button_enter"
        variant="authMain"
      >
        Войти
      </Button>
      <Button onClick={onSignUpButtonClickHandler}>
        Регистрация
      </Button>
    </Box>
  );
};

export const LoginForm = memo(LoginFormComponent);
