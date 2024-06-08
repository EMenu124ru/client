import {
    BookingTableFormSubmitButton
} from "@features/menu/components/BookingTableForm/BookingTableFormSubmitButton/BookingTableFormSubmitButton";
import { DateTimePicker } from "@features/menu/modules/DateTimePicker/DateTimePicker";
import { PartialRecord } from "@models/helpers";
import { MakeReservationRequest } from "@models/reservation";
import {
    Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { Loader } from "@shared/Loader/Loader";
import { selectBasket } from "@store/basket/selectors";
import { useMakeReservationMutation } from "@store/reservation/api";
import { useGetRestaurantPlacesQuery } from "@store/restaurants/api";
import { Formik } from "formik";
import React, { FC, memo, useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./BookingTableForm.module.scss";

interface Props {
    currentPlace?: number;
}

type FormType = Omit<MakeReservationRequest, "order" | "restaurant" | "tagToPlace">;

/**
 * Booking table.
 */
const BookingTableFormComponent: FC<Props> = ({
    currentPlace
}) => {
    const basket = useSelector(selectBasket);
    const { data: placesData, isFetching: isPlacesFetching } = useGetRestaurantPlacesQuery(
        { tag: currentPlace?.toString() ?? "" },
        { skip: currentPlace === undefined }
    );
    const places = useMemo(() => placesData?.free || [], [placesData]);

    const [makeReservation, { isLoading }] = useMakeReservationMutation();

    return (
        <div className={styles.bookingTableForm}>
            <Formik<FormType>
                initialValues={{
                    arrivalTime: "",
                    comment: "",
                    place: 0,
                }}
                validate={(values) => {
                    const errors: PartialRecord<keyof FormType, string> = {};
                    if (!values.arrivalTime) {
                        errors.arrivalTime = "Обязательное поле";
                    }
                    if (!values.place) {
                        errors.place = "Обязательное поле";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    if (currentPlace) {
                        makeReservation({
                            ...values,
                            restaurant: currentPlace,
                            order: {
                                comment: "",
                                dishes: Object.values(basket).map((value) => ({
                                    comment: "",
                                    count: value.quantity,
                                    dish: value.id
                                }))
                            }
                        });
                    }
                    setSubmitting(false);
                }}
            >
                {(props) => {
                    const {
                        values,
                        errors,
                        touched,
                        getFieldProps,
                        handleSubmit,
                    } = props;
                    return (
                        <>
                            <Typography>
                                Бронирование столиков
                            </Typography>
                            <Box display="flex" gap="16px">
                                <DateTimePicker
                                    disablePast
                                    error={!!errors.arrivalTime && !!touched.arrivalTime}
                                    helperText={errors.arrivalTime}
                                    {...getFieldProps("arrivalTime")}
                                />
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
                            <FormControl sx={{ width: "100%" }}>
                                <Box sx={{ position: "relative" }}>
                                    <Select
                                        labelId="table-label"
                                        fullWidth
                                        disableUnderline
                                        label={places.length ? "Выберите столик" : "Нет свободных столиков"}
                                        disabled={!places.length}
                                        variant="filled"
                                        error={!!errors.place && !!touched.place}
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
                                        {...getFieldProps("place")}
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
                                    {
                                        !values.place
                                  && (
                                      <InputLabel
                                          sx={{
                                              top: "50%",
                                              left: "50%",
                                              transform: "translate(-50%, -50%)",
                                              fontSize: "20px"
                                          }}
                                          id="table-label"
                                      >
                                          {places.length ? "Выберите столик" : "Нет свободных столиков"}
                                      </InputLabel>
                                  )
                                    }
                                </Box>
                                {errors.place && !!touched.place && (
                                    <FormHelperText sx={{ color: "red" }}>
                                        {errors.place}
                                    </FormHelperText>
                                )}
                            </FormControl>
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
                                {...getFieldProps("comment")}
                            />
                            <BookingTableFormSubmitButton
                                // @ts-ignore
                                onClick={handleSubmit}
                                disabled={!currentPlace}
                                isLoading={isLoading}
                            />
                        </>
                    );
                }}
            </Formik>
        </div>
    );
};

export const BookingTableForm = memo(BookingTableFormComponent);
