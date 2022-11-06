import { FC, memo } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Button, ButtonGroup, IconButton } from '@mui/material';
import styles from './DishCardButton.module.scss';

interface DishCardButtonProps {

  /** Quantity of dishes. */
  readonly quantity: number | undefined;
}

/**
 * Button high order component.
 * @param quantity Quantity of dishes.
 * @constructor
 */
const DishCardButtonComponent: FC<DishCardButtonProps> = ({ quantity }) => (
  <>
    {
      quantity ?
        (
          <ButtonGroup className={styles.buttonsGroup}>
            <IconButton>
              <RemoveCircleOutlineIcon className={styles.changeQuantityButton} />
            </IconButton>
            <Box className={styles.quantityBox}>
              {quantity}
            </Box>
            <IconButton>
              <AddCircleOutlineIcon className={styles.changeQuantityButton} />
            </IconButton>
          </ButtonGroup>
        ) :
        (
          <Button className={styles.mainButton} variant="cardDishButton">Hi</Button>
        )
    }

  </>
);

export const DishCardButton = memo(DishCardButtonComponent);
