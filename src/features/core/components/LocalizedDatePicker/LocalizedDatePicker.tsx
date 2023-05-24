import React, {FC, memo} from 'react';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/ru';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DatePickerProps} from "@mui/x-date-pickers/DatePicker/DatePicker.types";
import styles from './LocalizedDatePicker.module.scss';
import {SxProps} from "@mui/material";

/**
 * Props for date picker.
 */
type LocalizedDatePickerProps<TDate extends any> = DatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>

const LocalizedDatePickerComponent: FC<LocalizedDatePickerProps<Date>> = (props) => {

  /** Props to style calendar dialog picker. */
  const calendarDialogStyleProps: SxProps = {
    "& .MuiPaper-root": {
      color: "black"
    },
    "& .MuiPickersDay-root": {
      color: "black"
    },
    "& .Mui-selected": {
      color: "white"
    },
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'ru'}>
        <DatePicker
          {...props}
          className={styles.datePicker}
          slotProps={{
            textField: {
              variant: 'standard',
              sx: {
                boxSizing: 'border-box',
                paddingTop: '0.75em',
                paddingLeft: '0.75em',
              },
              InputProps: { disableUnderline: true },
            },
            popper: {
              sx:calendarDialogStyleProps
            }
          }}
        />
    </LocalizationProvider>
  );
};

export const LocalizedDatePicker = memo(LocalizedDatePickerComponent)
