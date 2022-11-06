import React, { FC, memo } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import styles from './BookingTableForm.module.scss';

/**
 * Booking table.
 */
const BookingTableFormComponent: FC = () => (
  <div className={styles.bookingTableForm}>
    <div className={styles.availableTables}>
      Свободных столиков: 10
    </div>
    <Select disableUnderline variant="filled" className={styles.selectTypesOfPlace}>
      <MenuItem className={styles.option} value="window">Столик у окна</MenuItem>
      <MenuItem className={styles.option} value="wall">Столик у стены</MenuItem>
      <MenuItem className={styles.option} value="toilet">Столик у туалета (иногда воняет )</MenuItem>
    </Select>
    <TextField className={styles.commentInput} placeholder="Комментарии к брони" variant="standard" />
    <Button className={styles.submitButton} variant="cardDishButton">
      Забронировать
    </Button>
  </div>
);

export const BookingTableForm = memo(BookingTableFormComponent);
