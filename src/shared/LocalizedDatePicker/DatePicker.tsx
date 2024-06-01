import { DatePicker as DatePickerMui } from "@mui/x-date-pickers";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker/DatePicker.types";
import React, { FC } from "react";

/**
 * Props for date picker.
 */
type LocalizedDatePickerProps<TDate> = DatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>;

export const DatePicker: FC<LocalizedDatePickerProps<Date>> = (props) => (
    <DatePickerMui
        {...props}
        slotProps={{
            textField: {
                sx: { borderRadius: "20px" },
                variant: "standard",
                placeholder: "Дата",
                InputProps: { disableUnderline: true },
            },
        }}
    />
);
