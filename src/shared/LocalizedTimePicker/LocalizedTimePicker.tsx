import { SxProps } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { TimePickerProps } from "@mui/x-date-pickers/TimePicker/TimePicker.types";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { FC, memo, RefAttributes } from "react";

/**
 * Props for date picker.
 */
type LocalizedTimPickerProps<TDate extends Date> = TimePickerProps<TDate> & RefAttributes<HTMLDivElement>;

/**
 * Localized time picker.
 * @param props
 */
const LocalizedTimePickerComponent: FC<LocalizedTimPickerProps<Date>> = (props) => {
    /** Props to style calendar dialog picker. */
    const calendarDialogStyleProps: SxProps = {
        "& .MuiPaper-root": {
            color: "black",
        },
        "& .MuiPickersDay-root": {
            color: "black",
        },
        "& .Mui-selected": {
            color: "white",
        },
    };

    return (
        <TimePicker
            {...props}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
            }}
            ampm={false}
            slotProps={{
                actionBar: {
                    sx: {
                        ".MuiButtonBase-root": {
                            padding: "0 0"
                        },
                        height: "20px"
                    }
                },
                textField: {
                    sx: {},
                    variant: "standard",
                    placeholder: "Время",
                    InputProps: { disableUnderline: true },
                    ...props?.slotProps?.textField,
                },
                popper: {
                    sx: calendarDialogStyleProps,
                },
            }}
        />
    );
};

export const LocalizedTimePicker = memo(LocalizedTimePickerComponent);
