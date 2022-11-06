import React, { FC, memo } from 'react';
import styles from './FoodCategories.module.scss';

/**
 * Food categories column.
 */
const FoodCategoriesComponent: FC = () => (
  <div className={styles.foodCategories}>
    <div className={styles.foodCategory}>
      Пицца
    </div>
    <div className={styles.foodCategory}>
      Салаты
    </div>
    <div className={styles.foodCategory}>
      Супы
    </div>
    <div className={styles.foodCategory}>
      Паста
    </div>
    <div className={styles.foodCategory}>
      Горячее
    </div>
    <div className={styles.foodCategory}>
      Закуски
    </div>
    <div className={styles.foodCategory}>
      Десерты
    </div>
    <div className={styles.foodCategory}>
      Напитки
    </div>
  </div>
);

export const FoodCategories = memo(FoodCategoriesComponent);
