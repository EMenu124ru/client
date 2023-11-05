import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import React, { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { phoneNumberValidators } from '@lib/regex';
import { LoginArguments } from '@models/loginArguments';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@store/store';
import { login } from '@store/auth/dispatchers';
import { selectAuthErrors, selectIsAuthLoading } from '@store/auth/selectors';
import styles from './LoginForm.module.scss';

/**
 * Login form.
 */
const LoginFormComponent: FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

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

  useEffect(() => {
    if (authErrors?.length) {
      setOpenSnackbar(true);
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
      onSubmit={async(values, { setSubmitting }) => {
        await loginHandler({
          password: values.password,
          phoneNumber: values.phone,
        });
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            className={styles.boxButtons}
          >
            <div className={styles.textLogin}>
              Авторизация
            </div>
            <TextField
              sx={{
                height: '60px',
              }}
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
              sx={{
                height: '60px',
              }}
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
              variant="authMain"
              type="submit"
              disabled={!!errors.phone?.length || !!errors.password?.length || isLoading}
            >
              Войти
            </Button>
            <Button onClick={onSignUpButtonClickHandler}>
              Регистрация
            </Button>
          </Box>
          {
            authErrors && (
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
              >
                <Alert
                  onClose={() => setOpenSnackbar(false)}
                  severity="error"
                >
                  {authErrors}
                </Alert>
              </Snackbar>
            )
          }
        </form>
      )}
    </Formik>

  );
};

export const LoginForm = memo(LoginFormComponent);
