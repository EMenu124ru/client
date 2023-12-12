import React, { FC, memo } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { LocalizedDatePicker } from '@shared/LocalizedDatePicker/LocalizedDatePicker';
import { LocalizedTimePicker } from '@shared/LocalizedTimePicker/LocalizedTimePicker';
import styles from './BookingTableForm.module.scss';

/**
 * Booking table.
 */
const BookingTableFormComponent: FC = () => (
  <div className={styles.bookingTableForm}>
    <div>
      Бронирование столиков
    </div>
    <div className={styles.dateTimePicker}>
      <div className={styles.picker}>
        <LocalizedDatePicker />
      </div>
      <div className={styles.picker}>
        <LocalizedTimePicker />
      </div>
    </div>
    <div className={styles.availableTables}>
      Свободных столиков: 10
    </div>
    <Select disableUnderline variant="filled" className={styles.selectTypesOfPlace}>
      <MenuItem className={styles.option} value="window">Столик у окна</MenuItem>
      <MenuItem className={styles.option} value="wall">Столик у стены</MenuItem>
      <MenuItem className={styles.option} value="toilet">Столик у туалета (иногда воняет )</MenuItem>
    </Select>
    <TextField
      inputProps={{
        style: {
          color: 'black',
        },
      }}
      className={styles.commentInput}
      multiline
      rows={4}
      placeholder="Комментарии к брони"
      variant="standard"
    />
    <Button className={styles.submitButton} variant="cardDishButton">
      Забронировать
    </Button>
  </div>
);

export const BookingTableForm = memo(BookingTableFormComponent);
