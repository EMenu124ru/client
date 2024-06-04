import { Button } from "@mui/material";
import { Loader } from "@shared/Loader/Loader";
import { selectBasket } from "@store/basket/selectors";
import React, { FC, memo } from "react";
import { useSelector } from "react-redux";

interface Props {
  isLoading: boolean
}

const BookingTableFormSubmitButtonComponent: FC<Props> = ({ isLoading }) => {
    const basket = useSelector(selectBasket);

    return (
        <Button disabled={!Object.keys(basket).length} fullWidth variant="cardDishButton">
            {isLoading
                ? <Loader color="secondary" />
                : "Забронировать"}
        </Button>
    );
};

export const BookingTableFormSubmitButton = memo(BookingTableFormSubmitButtonComponent);
