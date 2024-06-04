import { Box } from "@mui/material";
import { selectBasket } from "@store/basket/selectors";
import React, { FC, memo, useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./ClientOrderCard.module.scss";

/**
 * Booking table.
 */
const ClientOrderCardComponent: FC = () => {
    const basket = useSelector(selectBasket);

    const totalSum = useMemo(() => {
        let sum = 0;
        (Object.keys(basket) as unknown as number[]).forEach(
            (dishId) => {
                sum += basket[dishId].price * basket[dishId].quantity;
            }
        );
        return sum;
    }, [basket]);

    return (
        <Box className={styles.clientOrderCardWrapper}>
            <Box>Ваш заказ</Box>
            {(Object.keys(basket) as unknown as number[]).map((dishId) => (
                <Box key={dishId} className={styles.basketDish}>
                    <Box>{basket[dishId].name}</Box>
                    <Box>{basket[dishId].quantity}</Box>
                </Box>
            ))}
            <Box className={styles.totalSum}>
                Сумма:
                {totalSum}
            </Box>
        </Box>
    );
};

export const ClientOrderCard = memo(ClientOrderCardComponent);
