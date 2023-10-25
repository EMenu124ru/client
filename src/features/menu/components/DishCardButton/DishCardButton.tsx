import { FC, memo } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import { addDishToBasket, decrementDishQuantity, incrementDishQuantity } from '@store/basket/slice';
import { Dish } from '@models/dish';
import { useAppDispatch } from '@store/store';
import styles from './DishCardButton.module.scss';

interface DishCardButtonProps {

  /** Quantity of dishes. */
  readonly quantity: number | undefined;

  /** Dish. */
  dish: Dish;
}

/**
 * Button high order component.
 */
const DishCardButtonComponent: FC<DishCardButtonProps> = ({ quantity, dish }) => {
  const dispatch = useAppDispatch();

  const handleAddDishToBasket = () => {
    dispatch(addDishToBasket({ dish }));
  };

  const handleIncreaseQuantityDish = () => {
    dispatch(incrementDishQuantity({ dishId: dish.id }));
  };

  const handleDecreaseQuantityDish = () => {
    dispatch(decrementDishQuantity({ dishId: dish.id }));
  };

  return (
    <>
      {
        quantity ?
          (
            <ButtonGroup className={styles.buttonsGroup}>
              <IconButton onClick={handleDecreaseQuantityDish}>
                <RemoveCircleOutlineIcon className={styles.changeQuantityButton} />
              </IconButton>
              <Box className={styles.quantityBox}>
                {quantity}
              </Box>
              <IconButton onClick={handleIncreaseQuantityDish}>
                <AddCircleOutlineIcon className={styles.changeQuantityButton} />
              </IconButton>
            </ButtonGroup>
          ) :
          (
            <Button
              className={styles.mainButton}
              onClick={handleAddDishToBasket}
              variant="cardDishButton"
            >
              <Typography>Заказать</Typography>
            </Button>
          )
      }

    </>
  );
};

export const DishCardButton = memo(DishCardButtonComponent);
