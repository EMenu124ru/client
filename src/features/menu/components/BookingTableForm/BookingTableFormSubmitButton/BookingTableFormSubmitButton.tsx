import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material/Button/Button";
import { Loader } from "@shared/Loader/Loader";
import { selectBasket } from "@store/basket/selectors";
import React, { FC, memo } from "react";
import { useSelector } from "react-redux";

interface Props extends ButtonProps {
  isLoading: boolean
  disabled?: boolean
}

const BookingTableFormSubmitButtonComponent: FC<Props> = ({ isLoading, disabled, ...props }) => {
    const basket = useSelector(selectBasket);

    return (
        <Button
            type="submit"
            disabled={disabled || !Object.keys(basket).length}
            fullWidth
            variant="cardDishButton"
            {...props}
        >
            {isLoading
                ? <Loader color="secondary" />
                : "Забронировать"}
        </Button>
    );
};

export const BookingTableFormSubmitButton = memo(BookingTableFormSubmitButtonComponent);
