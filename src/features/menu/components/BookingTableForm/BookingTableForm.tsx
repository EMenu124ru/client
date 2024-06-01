import { phoneNumberValidators } from "@lib/regex";
import {
    Box,
    Button, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { Loader } from "@shared/Loader/Loader";
import { DatePicker } from "@shared/LocalizedDatePicker/DatePicker";
import { LocalizedTimePicker } from "@shared/LocalizedTimePicker/LocalizedTimePicker";
import { selectBasket } from "@store/basket/selectors";
import { useMakeReservationMutation } from "@store/reservation/api";
import { Formik } from "formik";
import React, { FC, memo } from "react";
import { useSelector } from "react-redux";

import styles from "./BookingTableForm.module.scss";

/**
 * Booking table.
 */
const BookingTableFormComponent: FC = () => {
    const basket = useSelector(selectBasket);

    const [makeResesrvation, { isLoading }] = useMakeReservationMutation();

    const submit = () => {

    };

    return (
        <div className={styles.bookingTableForm}>
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
                    // makeResesrvation
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <>
                        <Typography>
                            Бронирование столиков
                        </Typography>
                        <Box display="flex" gap="16px">
                            <DatePicker />
                            <LocalizedTimePicker />
                        </Box>
                        <Box sx={{
                            bgcolor: "secondary.main",
                            borderRadius: "20px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            padding: "20px 30px",
                            boxSizing: "border-box"
                        }}
                        >
                            <Typography variant="body3">
                                Свободных столиков: 10
                            </Typography>
                        </Box>
                        <Select
                            fullWidth
                            disableUnderline
                            variant="filled"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "20px",
                                bgcolor: "secondary.main",
                                "& .MuiSelect-select": {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            }}
                        >
                            <MenuItem className={styles.option} value="window">Столик у окна</MenuItem>
                            <MenuItem className={styles.option} value="wall">Столик у стены</MenuItem>
                            <MenuItem className={styles.option} value="toilet">
                                Столик у туалета (иногда воняет)
                            </MenuItem>
                        </Select>
                        <TextField
                            inputProps={{
                                style: {
                                    color: "black",
                                },
                            }}
                            className={styles.commentInput}
                            multiline
                            rows={4}
                            placeholder="Комментарии к брони"
                            variant="standard"
                        />
                        <Button disabled={!Object.keys(basket).length} fullWidth variant="cardDishButton">
                            {isLoading
                                ? <Loader color="secondary" />
                                : "Забронировать"}
                        </Button>
                    </>

                )}
            </Formik>
        </div>
    );
};

export const BookingTableForm = memo(BookingTableFormComponent);
