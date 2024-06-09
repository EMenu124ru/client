import { DatePicker } from "@shared/LocalizedDatePicker";
import { LocalizedTimePicker } from "@shared/LocalizedTimePicker";
import {
    getDate,
    getHours,
    getMinutes,
    getMonth,
    getSeconds,
    getYear,
    isValid,
    setDate,
    setHours,
    setMinutes,
    setMonth, setSeconds,
    setYear,
} from "date-fns";
import { FieldInputProps } from "formik/dist/types";
import React, { FC, useMemo, useState } from "react";

type Props = FieldInputProps<any> & {
  disablePast?: boolean
  disableFuture?: boolean
  error?: boolean
  helperText?: string
};

export const DateTimePicker: FC<Props> = ({ ...props }) => {
    const {
        onChange, name
    } = props;
    const parsedDate = useMemo(() => new Date(props.value), [props.value]);

    const date = useMemo(() => (isValid(parsedDate) ? parsedDate : null), [props.value]);

    const [, setDateTime] = useState<Date | null>(null);

    const onDateChange = (newDate: Date | null) => {
        if (!newDate || !isValid(newDate)) {
            return;
        }
        setDateTime((prevState) => {
            if (!prevState) {
                onChange(name)(newDate.toISOString());
                return newDate;
            }

            const year = getYear(newDate);
            const month = getMonth(newDate);
            const day = getDate(newDate);
            let updatedDate = setYear(prevState, year);
            updatedDate = setMonth(updatedDate, month);
            updatedDate = setDate(updatedDate, day);

            if (onChange) {
                onChange(name)(updatedDate.toISOString());
            }

            return updatedDate;
        });
    };
    const textFieldProps = useMemo(() => ({
        onBlur: props.onBlur,
        error: props.error,
    }), [props.error, props.helperText, props.onBlur]);

    const onTimeChange = (newDate: Date | null) => {
        if (!newDate || !isValid(newDate)) {
            return;
        }
        setDateTime((prevState) => {
            if (!prevState) {
                onChange(newDate.toISOString());
                return newDate;
            }

            const hour = getHours(newDate);
            const minutes = getMinutes(newDate);
            const seconds = getSeconds(newDate);

            let updatedDate = setHours(prevState, hour);
            updatedDate = setMinutes(updatedDate, minutes);
            updatedDate = setSeconds(updatedDate, seconds);

            if (onChange) {
                onChange(updatedDate.toISOString());
            }
            return updatedDate;
        });
    };

    return (
        <>
            <DatePicker
                slotProps={{
                    textField: textFieldProps
                }}
                {...props}
                value={date}
                onChange={onDateChange}
            />
            <LocalizedTimePicker
                disablePast
                slotProps={{
                    textField: textFieldProps
                }}
                {...props}
                value={date}
                onChange={onTimeChange}
            />
        </>
    );
};
