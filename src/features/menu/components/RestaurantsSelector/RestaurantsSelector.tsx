import styles from "@features/menu/components/MenuBar/MenuBar.module.scss";
import NearMeIcon from "@mui/icons-material/NearMe";
import {
    Box, ButtonBase, Menu, MenuItem, Typography
} from "@mui/material";
import { clearBasket } from "@store/basket/slice";
import { useGetRestaurantsQuery } from "@store/restaurants/api";
import React, {
    FC, useMemo, useState
} from "react";

// eslint-disable-next-line import/extensions
import { useAppDispatch } from "@/store";

interface RestaurantsSelectorProps {
  currentPlace?: number,
  changePlaceHandler: (placeId: number) => void
}

export const RestaurantsSelector: FC<RestaurantsSelectorProps> = ({
    changePlaceHandler,
    currentPlace
}) => {
    const { data: restaurantData } = useGetRestaurantsQuery();
    const restaurants = useMemo(() => restaurantData || [], [restaurantData]);
    const [anchorElPlaces, setAnchorElPlaces] = useState<null | HTMLElement>(null);

    const [currentPaceName, setCurrentPaceName] = useState("");

    const dispatch = useAppDispatch();

    /**
   * Handler to open places menu.
   * @param event Event.
   */
    const handleOpenNavPlacesMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElPlaces(event.currentTarget);
    };

    /**
   * Handler to close places menu.
   */
    const handleCloseNavPlacesMenu = (): void => {
        setAnchorElPlaces(null);
    };

    const handlerSelectPlace = (value: number, address: string): void => {
        if (currentPlace !== value) {
            dispatch(clearBasket());
        }

        changePlaceHandler(value);
        setCurrentPaceName(address);
        handleCloseNavPlacesMenu();
    };

    return (
        <>
            <Box className={styles.places}>
                <ButtonBase onClick={handleOpenNavPlacesMenu}>
                    <NearMeIcon />
                    <Typography variant="body3">
                        {currentPaceName || "Выберите ресторан"}
                    </Typography>
                </ButtonBase>
            </Box>
            <Menu
                className={styles.popOverMenuPlaces}
                anchorEl={anchorElPlaces}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorElPlaces)}
                onClose={handleCloseNavPlacesMenu}
            >
                {restaurants
                    .map((restaurant) => (
                        <MenuItem
                            value={restaurant.id}
                            className={styles.menuPlace}
                            key={restaurant.id.toString()}
                            onClick={() => handlerSelectPlace(restaurant.id, restaurant.address)}
                        >
                            {restaurant.address}
                        </MenuItem>
                    ))}
            </Menu>
        </>

    );
};
