import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import React, { FC } from 'react';
import './SignUpForm.scss';

/**
 * Sign up form group.
 */
export const SignUpForm: FC = () => {
  const navigate = useNavigate();

  /**
   * Sign up button handler.
   */
  const onLoginButtonClickHandler = (): void => {
    navigate('/auth/login');
  };

  return (
    <Box
      className="auth__box_buttons"
    >
      <text className="auth__form_text_signup">
        Регистрация
      </text>
      <TextField
        className="auth__input_text_signup"
        required
        placeholder="Фамилия"
      />
      <TextField
        className="auth__input_text_signup"
        required
        placeholder="Имя"
      />
      <TextField
        className="auth__input_text_signup"
        required
        placeholder="Номер телефона"
      />
      <TextField
        className="auth__input_text_signup"
        required
        placeholder="Пароль"
      />
      <Button
        className="auth__button_enter"
        variant="authMain"
      >
        Регистрация
      </Button>
      <Button onClick={onLoginButtonClickHandler}>
        Войти
      </Button>
    </Box>
  );
};
