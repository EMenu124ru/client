import React, { FC } from 'react';
import { MenuBar } from '@features/menu/components/MenuBar';
import { FoodCategories } from '@features/menu/components/FoodCategories';
import { DishCard } from '@features/menu/components/DishCard';
import { Grid } from '@mui/material';
import { BookingTableForm } from '@features/menu/components/BookingTableForm';
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
    <MenuBar />
    <Grid container className={styles.mainContent} spacing={4}>
      <Grid className={styles.foodCategories} item xs="auto">
        <FoodCategories />
      </Grid>
      <Grid className={styles.dishesWrapper} item container columnSpacing={3} rowSpacing={4} xs={5} md={6} lg={7} xl={8}>
        {dishes.map(dish => (
          // eslint-disable-next-line react/jsx-key
          <Grid item xs="auto">
            {dish}
          </Grid>
        ))}
      </Grid>
      <Grid className={styles.bookingTableFormWrapper} item xs={1} md={2}>
        <BookingTableForm />
      </Grid>
    </Grid>
  </div>
);
