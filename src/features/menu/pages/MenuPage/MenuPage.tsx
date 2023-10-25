import React, { FC, useEffect } from 'react';
import { MenuBar } from '@features/menu/components/MenuBar';
import { FoodCategories } from '@features/menu/components/FoodCategories';
import { DishCard } from '@features/menu/components/DishCard';
import { Box, Grid } from '@mui/material';
import { BookingTableForm } from '@features/menu/components/BookingTableForm';
import { ClientOrderCard } from '@features/menu/components/ClientOrderCard';
import { selectBasket } from '@store/basket/selectors';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getDishes } from '@store/dishes/dispatchers';
import { selectAllDishes, selectDishesErrors } from '@store/dishes/selectors';
import { useSnackbar } from 'notistack';
import styles from './MenuPage.module.scss';

/**
 * Menu page.
 */
export const MenuPage: FC = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const errors = useAppSelector(selectDishesErrors);
  const dishes = useAppSelector(selectAllDishes);
  const { enqueueSnackbar } = useSnackbar();
  const fetchDishes = async() => {
    await dispatch(getDishes());
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    if (errors) {
      enqueueSnackbar('Ошибка получений блюд', { variant: 'error' });
    }
  }, [errors]);

  return (
    <Box className={styles.menuPage}>
      <MenuBar />
      <Box className={styles.foodCategories}>
        <FoodCategories />
      </Box>
      <Grid className={styles.dishesWrapper} container columnSpacing={3} rowSpacing={4}>
        {dishes.map(dish => (
          <Grid key={dish.id} item xs="auto">
            <DishCard key={dish.id} dish={dish} quantity={basket[dish.id]?.quantity} />
          </Grid>
        ))}
      </Grid>
      <Box className={styles.bookingTableFormWrapper}>
        <Box position="sticky" top="100px">
          {!!Object.keys(basket).length && <ClientOrderCard />}
          <BookingTableForm key="BookingTableForm" />
        </Box>
      </Box>
    </Box>
  );
};
