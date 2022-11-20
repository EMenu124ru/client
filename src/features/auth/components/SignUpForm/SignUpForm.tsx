import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import { useAppDispatch } from '@store/store';
import React, { FC, useEffect, useState } from 'react';
import { phoneNumberValidators } from '@lib/regex';
import { Formik } from 'formik';
import { register } from '@store/auth/dispatchers';
import { RegisterArguments } from '@models/registerArguments';
import { useSelector } from 'react-redux';
import { selectAuthErrors, selectIsAuthLoading } from '@store/auth/selectors';
import styles from './SignUpForm.module.scss';

/**
 * Sign up form group.
 */
export const SignUpForm: FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const authErrors = useSelector(selectAuthErrors);
  const isLoading = useSelector(selectIsAuthLoading);

  /**
   * Register handler.
   */
  const registerHandler = ({ phoneNumber, password, firstName, secondName }: RegisterArguments): void => {
    dispatch(register({ phoneNumber, password, firstName, secondName }));
  };

  /**
   * Sign up button handler.
   */
  const onLoginButtonClickHandler = (): void => {
    navigate('/auth/login');
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
        firstName: '',
        secondName: '',
      }}
      validate={values => {
        const errors: {
          password?: string;
          phone?: string;
          firstName?: string;
          secondName?: string;
        } = {};
        if (!values.phone) {
          errors.phone = 'Обязательное поле';
        } else if (!phoneNumberValidators.ru.test(values.phone)) {
          errors.phone = 'Неверный формат номера телефона';
        }
        if (!values.password) {
          errors.password = 'Обязательное поле';
        }
        if (!values.firstName) {
          errors.firstName = 'Обязательное поле';
        }
        if (!values.secondName) {
          errors.secondName = 'Обязательное поле';
        }
        return errors;
      }}
      onSubmit={async(values, { setSubmitting }) => {
        await registerHandler({
          password: values.password,
          phoneNumber: values.phone,
          firstName: values.firstName,
          secondName: values.secondName,
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
            <div className={styles.signupText}>
              Регистрация
            </div>
            <TextField
              className={`${styles.signupInput} ${errors.secondName && styles.inputError}`}
              onChange={handleChange}
              value={values.secondName}
              name="secondName"
              helperText={errors.secondName}
              placeholder="Фамилия"
            />
            <TextField
              className={`${styles.signupInput} ${errors.firstName && styles.inputError}`}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              helperText={errors.firstName}
              placeholder="Имя"
            />
            <TextField
              className={`${styles.signupInput} ${errors.phone && styles.inputError}`}
              name="phone"
              onChange={handleChange}
              value={values.phone}
              helperText={errors.phone}
              placeholder="Номер телефона"
            />
            <TextField
              className={`${styles.signupInput} ${errors.password && styles.inputError}`}
              name="password"
              onChange={handleChange}
              value={values.password}
              helperText={errors.password}
              placeholder="Пароль"
            />
            <Button
              className={styles.enterButton}
              variant="authMain"
              type="submit"
              disabled={
                !!errors.phone?.length ||
                !!errors.password?.length ||
                !!errors.firstName?.length ||
                !!errors.secondName?.length ||
                isLoading
              }
            >
              Регистрация
            </Button>
            <Button onClick={onLoginButtonClickHandler}>
              Войти
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
