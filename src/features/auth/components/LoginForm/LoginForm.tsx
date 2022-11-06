import { Box, Button, TextField } from '@mui/material';
import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';

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
      className={styles.boxButtons}
    >
      <text className={styles.textLogin}>
        Авторизация
      </text>
      <TextField
        className={styles.inputTextLogin}
        required
        placeholder="Номер телефона"
      />
      <TextField
        className={styles.inputTextLogin}
        required
        placeholder="Пароль"
      />
      <Button
        className={styles.buttonEnter}
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
