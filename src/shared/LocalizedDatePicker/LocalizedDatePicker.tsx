import React, { FC, memo } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker.types';
import { SxProps } from '@mui/material';
import styles from './LocalizedDatePicker.module.scss';

/**
 * Props for date picker.
 */
type LocalizedDatePickerProps<TDate> = DatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>;

/**
 * Localized date picker.
 */
const LocalizedDatePickerComponent: FC<LocalizedDatePickerProps<Date>> = props => {
  /** Props to style calendar dialog picker. */
  const calendarDialogStyleProps: SxProps = {
    '& .MuiPaper-root': {
      color: 'black',
    },
    '& .MuiPickersDay-root': {
      color: 'black',
    },
    '& .Mui-selected': {
      color: 'white',
    },
  };

  return (
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
          sx: calendarDialogStyleProps,
        },
      }}
    />
  );
};

export const LocalizedDatePicker = memo(LocalizedDatePickerComponent);
