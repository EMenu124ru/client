import {
    BookingTableFormSubmitButton
} from "@features/menu/components/BookingTableForm/BookingTableFormSubmitButton/BookingTableFormSubmitButton";
import { phoneNumberValidators } from "@lib/regex";
import {
    Box, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { Loader } from "@shared/Loader/Loader";
import { DatePicker } from "@shared/LocalizedDatePicker/DatePicker";
import { LocalizedTimePicker } from "@shared/LocalizedTimePicker/LocalizedTimePicker";
import { useMakeReservationMutation } from "@store/reservation/api";
import { useGetRestaurantPlacesQuery, useGetRestaurantTagsQuery } from "@store/restaurants/api";
import { Formik } from "formik";
import React, { FC, memo, useMemo } from "react";

import styles from "./BookingTableForm.module.scss";

interface Props {
    currentPlace?: number;
}

/**
 * Booking table.
 */
const BookingTableFormComponent: FC<Props> = ({
    currentPlace
}) => {
    const { data: placesData, isFetching: isPlacesFetching } = useGetRestaurantPlacesQuery(
        { tag: currentPlace?.toString() ?? "" },
        { skip: currentPlace === undefined }
    );
    const places = useMemo(() => placesData?.free || [], [placesData]);

    const { data: tagsData, isFetching: isTagsFetching } = useGetRestaurantTagsQuery();
    console.log(tagsData);

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
                            {
                                isPlacesFetching
                                    ? <Loader />
                                    : (
                                        <Typography variant="body3">
                                            Свободных столиков:
                                            {" "}
                                            {places.length}
                                        </Typography>
                                    )
                            }

                        </Box>
                        <Select
                            fullWidth
                            disableUnderline
                            placeholder={places.length ? "Выберите столик" : "Нет свободных столиков"}
                            disabled={!places.length}
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
                                },
                                "& .MuiInputBase-input:focus": {
                                    borderRadius: "20px",
                                },
                            }}
                        >
                            {
                                places.map((place) => (
                                    <MenuItem
                                        className={styles.option}
                                        key={place.id}
                                        value={place.id}
                                    >
                                        {place.place}
                                    </MenuItem>
                                ))
                            }
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
                        <BookingTableFormSubmitButton isLoading={isLoading} />
                    </>

                )}
            </Formik>
        </div>
    );
};

export const BookingTableForm = memo(BookingTableFormComponent);
