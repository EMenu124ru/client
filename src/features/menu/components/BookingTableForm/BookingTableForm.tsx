import {
    BookingTableFormSubmitButton
} from "@features/menu/components/BookingTableForm/BookingTableFormSubmitButton/BookingTableFormSubmitButton";
import { DateTimePicker } from "@features/menu/modules/DateTimePicker/DateTimePicker";
import { useSnackbar } from "@hooks/useSnackbar";
import { isFetchBaseQueryError } from "@lib/isFetchBaseQueryError";
import { PartialRecord } from "@models/helpers";
import { MakeReservationRequest } from "@models/reservation";
import {
    Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { Loader } from "@shared/Loader/Loader";
import { selectBasket } from "@store/basket/selectors";
import { useMakeReservationMutation } from "@store/reservation/api";
import { useGetRestaurantPlacesQuery, useGetRestaurantTagsQuery } from "@store/restaurants/api";
import { addDays } from "date-fns";
import { Formik, FormikConfig } from "formik";
import React, {
    FC, memo, useMemo
} from "react";
import { useSelector } from "react-redux";

import styles from "./BookingTableForm.module.scss";

interface Props {
    currentPlace?: number;
}

type FormType = Omit<MakeReservationRequest, "order" | "restaurant">;

const selectStyles = {
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
};

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

    const { data: tagsData, isFetching: isTagsFetching } = useGetRestaurantTagsQuery(
        { tag: currentPlace?.toString() ?? "" },
        { skip: currentPlace === undefined }
    );

    const placeTags = useMemo(() => tagsData?.location || [], [tagsData]);
    const questNumberTags = useMemo(() => tagsData?.numberOfSeats || [], [tagsData]);

    const places = useMemo(() => placesData?.free || [], [placesData]);

    const [makeReservation, { isLoading }] = useMakeReservationMutation();

    const { snackError, snackSuccess } = useSnackbar();

    const onSubmit: FormikConfig<FormType>["onSubmit"] = async (values, { setSubmitting }) => {
        if (currentPlace) {
            const res = await makeReservation({
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

            if ("error" in res) {
                const { error } = res;
                if (isFetchBaseQueryError(error)) {
                    const data = error.data as string[];
                    if (data.length) {
                        snackError(data[0]);
                    } else {
                        snackError("Ошибка бронирования");
                    }
                }
            } else {
                snackSuccess("Бронирование успешно завершено, подробности уточняйте у менеджеров");
            }
        }
        setSubmitting(false);
    };

    return (
        <div className={styles.bookingTableForm}>
            <Formik<FormType>
                initialValues={{
                    arrivalTime: "",
                    comment: "",
                    tagToNumber: 0,
                    tagToLocation: 0,
                }}
                validate={(values) => {
                    const errors: PartialRecord<keyof FormType, string> = {};
                    if (!values.arrivalTime) {
                        errors.arrivalTime = "Обязательное поле";
                    }
                    if (new Date(values.arrivalTime) < addDays(new Date(), 1)) {
                        errors.arrivalTime = "Минимальное время бронирования - 24 часа";
                    }

                    if (!values.tagToNumber) {
                        errors.tagToNumber = "Обязательное поле";
                    }

                    if (!values.tagToLocation) {
                        errors.tagToLocation = "Обязательное поле";
                    }

                    return errors;
                }}
                onSubmit={onSubmit}
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
                            <Box position="relative">
                                <Box display="flex" gap="16px">
                                    <DateTimePicker
                                        disablePast
                                        error={!!errors.arrivalTime && !!touched.arrivalTime}
                                        helperText={
                                            (!!errors.arrivalTime && !!touched.arrivalTime)
                                                ? errors.arrivalTime
                                                : ""
                                        }
                                        {...getFieldProps("arrivalTime")}
                                    />
                                </Box>
                                {!!errors.arrivalTime && !!touched.arrivalTime
                                  && (
                                      <Box
                                          width="100%"
                                          position="absolute"
                                          display="flex"
                                          justifyContent="center"
                                          bottom="-22px"
                                      >
                                          <FormHelperText sx={{ fontSize: "14px" }} error>
                                              {errors.arrivalTime}
                                          </FormHelperText>
                                      </Box>
                                  )}
                            </Box>
                            <FormControl sx={{ width: "100%" }}>
                                <Box sx={{ position: "relative" }}>
                                    <Select
                                        labelId="place-label"
                                        fullWidth
                                        disableUnderline
                                        disabled={!questNumberTags.length}
                                        variant="filled"
                                        error={!!errors.tagToNumber && !!touched.tagToNumber}
                                        sx={selectStyles}
                                        {...getFieldProps("tagToNumber")}
                                    >
                                        {
                                            questNumberTags.map((tag) => (
                                                <MenuItem
                                                    className={styles.option}
                                                    key={tag.id}
                                                    value={tag.id}
                                                >
                                                    {tag.name}
                                                </MenuItem>
                                            ))
                                        }
                                        {
                                            isTagsFetching && <Loader />
                                        }
                                    </Select>
                                    {
                                        !values.tagToNumber
                                && (
                                    <InputLabel
                                        sx={{
                                            pointerEvents: "none",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            fontSize: "20px"
                                        }}
                                        id="place-label"
                                    >
                                        {places.length ? "Выберите количество гостей" : "Нет свободных столиков"}
                                    </InputLabel>
                                )
                                    }
                                </Box>
                                {errors.tagToNumber && !!touched.tagToNumber && (
                                    <FormHelperText sx={{ color: "red" }}>
                                        {errors.tagToNumber}
                                    </FormHelperText>
                                )}
                            </FormControl>
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
                                        label={placeTags.length ? "Выберите столик" : "Нет свободных столиков"}
                                        disabled={!placeTags.length}
                                        variant="filled"
                                        error={!!errors.tagToLocation && !!touched.tagToLocation}
                                        sx={selectStyles}
                                        {...getFieldProps("tagToLocation")}
                                    >
                                        {
                                            placeTags.map((tag) => (
                                                <MenuItem
                                                    className={styles.option}
                                                    key={tag.id}
                                                    value={tag.id}
                                                >
                                                    {tag.name}
                                                </MenuItem>
                                            ))
                                        }
                                        {
                                            isTagsFetching && <Loader />
                                        }
                                    </Select>
                                    {
                                        !values.tagToLocation
                                  && (
                                      <InputLabel
                                          sx={{
                                              pointerEvents: "none",
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
                                {errors.tagToLocation && !!touched.tagToLocation && (
                                    <FormHelperText sx={{ color: "red" }}>
                                        {errors.tagToLocation}
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
