import { useSnackbar } from "@hooks/useSnackbar";
import { isFetchBaseQueryError } from "@lib/isFetchBaseQueryError";
import { phoneNumberValidators } from "@lib/regex";
import {
    Box, Button, TextField, Typography
} from "@mui/material";
import { useSignupMutation } from "@store/auth/api";
import { Formik } from "formik";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SignUpForm.module.scss";

/**
 * Sign up form group.
 */
export const SignUpForm: FC = () => {
    const [signup, { isLoading, error: authErrors }] = useSignupMutation();

    const navigate = useNavigate();

    /**
   * Sign up button handler.
   */
    const onLoginButtonClickHandler = (): void => {
        navigate("/auth/login");
    };

    const { snackError } = useSnackbar();

    useEffect(() => {
        if (authErrors && isFetchBaseQueryError(authErrors)) {
            const data = authErrors.data as string[];
            if (data.length) {
                snackError(data[0]);
            } else {
                snackError("Ошибка авторизации");
            }
        }
    }, [authErrors]);

    return (
        <Formik
            initialValues={{
                phone: "",
                password: "",
                firstName: "",
                lastName: "",
            }}
            validate={(values) => {
                const errors: {
                  password?: string;
                  phone?: string;
                  firstName?: string;
                  lastName?: string;
        } = {};
                if (!values.phone) {
                    errors.phone = "Обязательное поле";
                } else if (!phoneNumberValidators.ru.test(values.phone)) {
                    errors.phone = "Неверный формат номера телефона";
                }
                if (!values.password) {
                    errors.password = "Обязательное поле";
                }
                if (!values.firstName) {
                    errors.firstName = "Обязательное поле";
                }
                if (!values.lastName) {
                    errors.lastName = "Обязательное поле";
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                await signup({
                    password: values.password,
                    phoneNumber: values.phone,
                    firstName: values.firstName,
                    lastName: values.lastName,
                });
                setSubmitting(false);
            }}
        >
            {({
                values, errors, handleChange, handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box className={styles.boxButtons}>
                        <Typography variant="h2" color="white">Регистрация</Typography>
                        <TextField
                            fullWidth
                            error={!!errors.lastName}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            helperText={errors.lastName}
                            placeholder="Фамилия"
                        />
                        <TextField
                            fullWidth
                            error={!!errors.firstName}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            helperText={errors.firstName}
                            placeholder="Имя"
                        />
                        <TextField
                            fullWidth
                            error={!!errors.phone}
                            name="phone"
                            onChange={handleChange}
                            value={values.phone}
                            helperText={errors.phone}
                            placeholder="Номер телефона"
                        />
                        <TextField
                            fullWidth
                            error={!!errors.password}
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            helperText={errors.password}
                            placeholder="Пароль"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            className={styles.enterButton}
                            type="submit"
                            disabled={
                                !!errors.phone?.length
                || !!errors.password?.length
                || !!errors.firstName?.length
                || !!errors.lastName?.length
                || isLoading
                            }
                        >
                            <Typography variant="body2">Регистрация</Typography>
                        </Button>
                        <Button fullWidth onClick={onLoginButtonClickHandler}>
                            <Typography variant="body2">Войти</Typography>
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};
