import React, {FC} from 'react';
import {MenuBar} from '@features/menu/components/MenuBar';
import {FoodCategories} from '@features/menu/components/FoodCategories';
import {DishCard} from '@features/menu/components/DishCard';
import {Grid} from '@mui/material';
import {BookingTableForm} from '@features/menu/components/BookingTableForm';
import styles from './MenuPage.module.scss';

const dishes: JSX.Element[] = [];

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 15; i++) {
  dishes.push(
    <DishCard
      key={i}
      description="Нежный осьминог с молодыми тропическими фруктами"
      title="Морской кошмар"
      weight={1100}
      composition="орешки, морские гады, лайм, вонючие овощи"
      price={1200}
    />,
  );
}

/**
 * Menu page.
 */
export const MenuPage: FC = () => (
  <div className={styles.menuPage}>
    <MenuBar/>
    <div className={styles.foodCategories}>
      <FoodCategories/>
    </div>
    <Grid className={styles.dishesWrapper} container columnSpacing={3} rowSpacing={4}>
      {dishes.map(dish => (
        // eslint-disable-next-line react/jsx-key
        <Grid item xs="auto">
          {dish}
        </Grid>
      ))}
    </Grid>
    <div className={styles.bookingTableFormWrapper}>
      <BookingTableForm/>
    </div>
  </div>
);
