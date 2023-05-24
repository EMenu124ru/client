import React, { FC, memo, useState } from 'react';
import image from '@assets/images/dish-image.png';
import { DishCardButton } from '@features/menu/components/DishCard/DishCardButton';
import { IconButton, Popover } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './DishCard.module.scss';

interface DishCardProps {

  /** Number of servings. */
  readonly quantity?: number;

  /** Information dish. */
  readonly description: string;

  /** Title. */
  readonly title: string;

  /** Weight in grams. */
  readonly weight: number;

  /** Composition of dish. */
  readonly composition: string;

  /** Price of dish. */
  readonly price: number;
}

/**
 * Card of dish with its info.
 */
const DishCardComponent: FC<DishCardProps> = ({
  composition,
  description,
  title,
  weight,
  price,
  quantity ,
}) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  /**
   * Handler to close popover info.
   * @param event Event.
   */
  const handleOpenDishInfo = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchor(event.currentTarget);
  };

  /**
   * Handler to close popover dish info.
   */
  const handleCloseDishInfo = (): void => {
    setAnchor(null);
  };
  return (
    <div className={styles.cardDish}>
      <div>
        <img src={image} alt="No alternative :c" className={styles.image} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.priceWrapper}>
        {price}
        <IconButton onClick={handleOpenDishInfo}>
          <InfoOutlinedIcon className={styles.tooltipIcon} />
        </IconButton>
        <Popover
          className={styles.dishPopover}
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={handleCloseDishInfo}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className={styles.dishPopoverText}>
            <div>
              <span className={styles.dishInfoType}>Состав: </span>
              {composition}
            </div>
            <div>
              <span className={styles.dishInfoType}>Масса: </span>
              {weight}
            </div>

            {/* <div>*/}
            {/*  <span className={styles.dishInfoType}>БЖУ: </span>*/}
            {/*  {composition}*/}
            {/* </div>*/}
          </div>
        </Popover>
      </div>
      <DishCardButton quantity={quantity} />
    </div>
  );
};

export const DishCard = memo(DishCardComponent);
