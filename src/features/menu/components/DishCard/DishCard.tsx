import { API_URL } from "@api/http";
import { DishCardButton } from "@features/menu/components/DishCardButton";
import { Dish } from "@models/dish";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Popover, Tooltip } from "@mui/material";
import React, { FC, memo, useState } from "react";

import styles from "./DishCard.module.scss";

interface DishCardProps {

  /** Dish. */
  readonly dish: Dish;

  /** Quantity in basket. */
  readonly quantity?: number;

}

/**
 * Card of dish with its info.
 * @param props
 */
const DishCardComponent: FC<DishCardProps> = (props: DishCardProps) => {
    const {
        dish,
        quantity,
    } = props;

    const {
        description,
        name,
        weight,
        price,
        compound,
        images,
    } = dish;

    const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

    /**
   * Handler to close popover info.
   * @param event Event.
   */
    const handleOpenDishInfo = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setMenuAnchor(event.currentTarget);
    };

    /**
   * Handler to close popover dish info.
   */
    const handleCloseDishInfo = () => {
        setMenuAnchor(null);
    };

    const dishName = <div className={styles.tooltip}>{name}</div>;

    return (
        <div className={styles.cardDish}>
            <div>
                <img
                    src={images.length
                        ? `${API_URL}${images[0].image}` : undefined}
                    alt="No alternative :c"
                    className={styles.image}
                />
            </div>
            <div className={styles.title}>
                <Tooltip title={dishName}>
                    <div>
                        {name}
                    </div>
                </Tooltip>
            </div>
            <div className={styles.description}>{description}</div>
            <div className={styles.priceWrapper}>
                {price}
                <IconButton onClick={handleOpenDishInfo}>
                    <InfoOutlinedIcon className={styles.tooltipIcon} />
                </IconButton>
                <Popover
                    className={styles.dishPopover}
                    open={Boolean(menuAnchor)}
                    anchorEl={menuAnchor}
                    onClose={handleCloseDishInfo}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <div className={styles.dishPopoverText}>
                        <div>
                            <span className={styles.dishInfoType}>Состав: </span>
                            {compound}
                        </div>
                        <div>
                            <span className={styles.dishInfoType}>Масса: </span>
                            {weight}
                        </div>
                    </div>
                </Popover>
            </div>
            <DishCardButton dish={dish} quantity={quantity} />
        </div>
    );
};

export const DishCard = memo(DishCardComponent);
