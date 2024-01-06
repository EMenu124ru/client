import { Box, Button, TextField, Typography } from '@mui/material';
import React, { FC, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { phoneNumberValidators } from '@lib/regex';
import { LoginArguments } from '@models/loginArguments';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@store/store';
import { login } from '@store/auth/dispatchers';
import { selectAuthErrors, selectIsAuthLoading } from '@store/auth/selectors';
import { useSnackbar } from '@hooks/useSnackbar';
import { cleanAuthErrors } from '@store/auth/slice';
import styles from './LoginForm.module.scss';

/**
 * Login form.
 */
const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const authErrors = useSelector(selectAuthErrors);
  const isLoading = useSelector(selectIsAuthLoading);

  /**
   * Login handler.
   */
  const loginHandler = ({ phoneNumber, password }: LoginArguments): void => {
    dispatch(login({ phoneNumber, password }));
  };

  /**
   * Sign up button handler.
   */
  const onSignUpButtonClickHandler = (): void => {
    navigate('/auth/signup');
  };

  const { snackError } = useSnackbar();

  useEffect(() => {
    if (authErrors?.length) {
      snackError(authErrors);
      dispatch(cleanAuthErrors());
    }
  }, [authErrors]);

  return (
    <Formik
      initialValues={{
        phone: '',
        password: '',
      }}
      validate={values => {
        const errors: {
          password?: string;
          phone?: string;
        } = {};
        if (!values.phone) {
          errors.phone = 'Обязательное поле';
        } else if (!phoneNumberValidators.ru.test(values.phone)) {
          errors.phone = 'Неверный формат номера телефона';
        }
        if (!values.password) {
          errors.password = 'Обязательное поле';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        loginHandler({
          password: values.password,
          phoneNumber: values.phone,
        });
        setSubmitting(false);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="0"
            gap="30px"
            width="100%"
          >
            <div className={styles.textLogin}>
              <Typography variant="h2">Авторизация</Typography>
            </div>
            <TextField
              name="phone"
              fullWidth
              error={!!errors.phone}
              onChange={handleChange}
              value={values.phone}
              helperText={errors.phone}
              placeholder="Номер телефона"
            />
            <TextField
              type="password"
              error={!!errors.password}
              fullWidth
              name="password"
              onChange={handleChange}
              value={values.password}
              helperText={errors.password}
              placeholder="Пароль"
            />
            <Button
              className={styles.buttonEnter}
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                textTransform: 'none',
              }}
              disabled={
                !!errors.phone?.length || !!errors.password?.length || isLoading
              }
            >
              <Typography variant="body2">
                Войти
              </Typography>
            </Button>
            <Button
              fullWidth
              sx={{
                textTransform: 'none',
              }}
              onClick={onSignUpButtonClickHandler}
            >
              <Typography variant="body2">
                Регистрация
              </Typography>
            </Button>
          </Box>

        </form>
      )}
    </Formik>
  );
};

export const LoginForm = memo(LoginFormComponent);
