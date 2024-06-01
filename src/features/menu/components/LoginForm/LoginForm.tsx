import { useSnackbar } from "@hooks/useSnackbar";
import { isFetchBaseQueryError } from "@lib/isFetchBaseQueryError";
import { phoneNumberValidators } from "@lib/regex";
import {
    Box, Button, TextField, Typography
} from "@mui/material";
import { useLoginMutation } from "@store/auth/api";
import { Formik } from "formik";
import React, { FC, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.scss";

/**
 * Login form.
 */
const LoginFormComponent: FC = () => {
    const [login, { isLoading, error: authErrors }] = useLoginMutation();

    const navigate = useNavigate();

    /**
   * Sign up button handler.
   */
    const onSignUpButtonClickHandler = (): void => {
        navigate("/auth/signup");
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
            }}
            validate={(values) => {
                const errors: {
                                  password?: string;
                                  phone?: string;
                                } = {};
                if (!values.phone) {
                    errors.phone = "Обязательное поле";
                } else if (!phoneNumberValidators.ru.test(values.phone)) {
                    errors.phone = "Неверный формат номера телефона";
                }
                if (!values.password) {
                    errors.password = "Обязательное поле";
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                await login({
                    password: values.password,
                    phoneNumber: values.phone,
                });
                setSubmitting(false);
            }}
        >
            {({
                values, errors, handleChange, handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        padding="0"
                        gap="30px"
                        width="100%"
                    >
                        <div>
                            <Typography color="white" variant="h2">Авторизация</Typography>
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
                                textTransform: "none",
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
                                textTransform: "none",
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
