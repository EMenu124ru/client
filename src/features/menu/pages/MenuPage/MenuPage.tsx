import { BookingTableForm } from "@features/menu/components/BookingTableForm";
import { ClientOrderCard } from "@features/menu/components/ClientOrderCard";
import { DishCard } from "@features/menu/components/DishCard";
import { FoodCategories } from "@features/menu/components/FoodCategories";
import { MenuBar } from "@features/menu/components/MenuBar";
import { Box, Grid } from "@mui/material";
import { Loader } from "@shared/Loader/Loader";
import { selectBasket } from "@store/basket/selectors";
import { useGetDishesCategoriesQuery } from "@store/dishCategories/api";
import { useGetDishesByCategoryQuery } from "@store/dishes/api";
import { useGetRestaurantPlacesQuery } from "@store/restaurants/api";
import { useAppSelector } from "@store/store";
import React, { FC, useMemo, useState } from "react";

import styles from "./MenuPage.module.scss";

/**
 * Menu page.
 */
export const MenuPage: FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [currentPlace, setCurrentPlace] = useState<number>();
    const [categoryId, setCategoryId] = useState<number>();

    const { data: dishesData, isFetching: isDishesFetching } = useGetDishesByCategoryQuery({
        pageSize,
        page,
        categoryId: categoryId as number,
        restaurantId: currentPlace as number,
    }, { skip: currentPlace === undefined || categoryId === undefined });

    const dishes = useMemo(() => dishesData?.results || [], [dishesData]);
    const basket = useAppSelector(selectBasket);

    const { data: placesData, isFetching: isPlacesFetching } = useGetRestaurantPlacesQuery({ tag: currentPlace?.toString() ?? "" }, { skip: currentPlace === undefined });
    const places = useMemo(() => placesData || [], [placesData]);
    const changePlaceHandler = (placeId: number) => {
        setCurrentPlace(placeId);
    };

    const changeCategoryIdHandler = (newCategoryId: number) => {
        setCategoryId(newCategoryId);
    };

    const {
        data: dishesCategoriesData
    } = useGetDishesCategoriesQuery();

    const dishesCategories = useMemo(() => dishesCategoriesData || [], [dishesCategoriesData]);

    return (
        <Box className={styles.menuPage}>
            <MenuBar changePlaceHandler={changePlaceHandler} currentPlace={currentPlace} />
            <Box className={styles.foodCategories}>
                {
                    !!dishesCategories.length
                  && <FoodCategories categoryId={categoryId} changeCategoryIdHandler={changeCategoryIdHandler} />
                }
            </Box>
            {
                isDishesFetching || isPlacesFetching
                    ? <Loader />
                    : (
                        <Grid className={styles.dishesWrapper} container columnSpacing={3} rowSpacing={4}>
                            {dishes.map((dish) => (
                                <Grid key={dish.id} item xs={12} sm={12} lg={6} xl={4}>
                                    <DishCard key={dish.id} dish={dish} quantity={basket[dish.id]?.quantity} />
                                </Grid>
                            ))}
                        </Grid>
                    )
            }
            <Box className={styles.bookingTableFormWrapper}>
                <Box position="sticky" top="100px">
                    {!!Object.keys(basket).length && <ClientOrderCard />}
                    <BookingTableForm key="BookingTableForm" />
                </Box>
            </Box>
        </Box>
    );
};
