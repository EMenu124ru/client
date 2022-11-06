import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import React, { FC } from 'react';
import styles from './SignUpForm.module.scss';

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
      className={styles.boxButtons}
    >
      <text className={styles.signupText}>
        Регистрация
      </text>
      <TextField
        className={styles.signupInputText}
        required
        placeholder="Фамилия"
      />
      <TextField
        className={styles.signupInputText}
        required
        placeholder="Имя"
      />
      <TextField
        className={styles.signupInputText}
        required
        placeholder="Номер телефона"
      />
      <TextField
        className={styles.signupInputText}
        required
        placeholder="Пароль"
      />
      <Button
        className={styles.enterButton}
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
