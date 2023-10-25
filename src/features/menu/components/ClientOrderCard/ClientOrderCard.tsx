import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectBasket } from '@store/basket/selectors';
import { Box } from '@mui/material';
import styles from './ClientOrderCard.module.scss';

/**
 * Booking table.
 */
const ClientOrderCardComponent: FC = () => {
  const basket = useSelector(selectBasket);

  return (
    <Box className={styles.clientOrderCardWrapper}>
      <Box>Ваш заказ</Box>
      {(Object.keys(basket) as unknown as number[]).map(dishId => (
        <Box key={dishId} className={styles.basketDish}>
          <Box>{basket[dishId].title}</Box>
          <Box>{basket[dishId].quantity}</Box>
        </Box>
      ))}
      <Box className={styles.totalSum}>
        Сумма:
        {0}
      </Box>
    </Box>
  );
};

export const ClientOrderCard = ClientOrderCardComponent;
