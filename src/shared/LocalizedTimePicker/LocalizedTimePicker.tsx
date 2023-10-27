import { FC, memo } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { SxProps } from '@mui/material';
import { TimePickerProps } from '@mui/x-date-pickers/TimePicker/TimePicker.types';
import styles from './LocalizedTimePicker.module.scss';

/**
 * Props for date picker.
 */
type LocalizedTimPickerProps<TDate> = TimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>;

/**
 * Localized time picker.
 * @param props
 */
const LocalizedTimePickerComponent: FC<LocalizedTimPickerProps<Date>> = props => {
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
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
      <TimePicker
        {...props}
        className={styles.timePicker}
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
    </LocalizationProvider>
  );
};

export const LocalizedTimePicker = memo(LocalizedTimePickerComponent);
