import React, { FC, memo } from 'react';
import { Button } from '@mui/material';
import styles from './FoodCategories.module.scss';

/**
 * Food categories column.
 */
const FoodCategoriesComponent: FC = () => (
  <div className={styles.foodCategories}>
    <Button variant="text" className={styles.foodCategory}>
      Пицца
    </Button>
    <Button className={styles.foodCategory}>
      Салаты
    </Button>
    <Button className={styles.foodCategory}>
      Супы
    </Button>
    <Button className={styles.foodCategory}>
      Паста
    </Button>
    <Button className={styles.foodCategory}>
      Горячее
    </Button>
    <Button className={styles.foodCategory}>
      Закуски
    </Button>
    <Button className={styles.foodCategory}>
      Десерты
    </Button>
    <Button className={styles.foodCategory}>
      Напитки
    </Button>
  </div>
);

export const FoodCategories = memo(FoodCategoriesComponent);
