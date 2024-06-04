import { BookingTableForm } from "@features/menu/components/BookingTableForm";
import { ClientOrderCard } from "@features/menu/components/ClientOrderCard";
import { DishCard } from "@features/menu/components/DishCard";
import { FoodCategories } from "@features/menu/components/FoodCategories";
import { MenuBar } from "@features/menu/components/MenuBar";
import { Dish } from "@models/dish";
import { Box, Grid } from "@mui/material";
import { Loader } from "@shared/Loader/Loader";
import { selectBasket } from "@store/basket/selectors";
import { useGetDishesCategoriesQuery } from "@store/dishCategories/api";
import { useGetDishesByCategoryQuery } from "@store/dishes/api";
import { useGetRestaurantPlacesQuery } from "@store/restaurants/api";
import { useAppSelector } from "@store/store";
import React, {
    FC, useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import styles from "./MenuPage.module.scss";

const PAGE_SIZE = 1;

/**
 * Menu page.
 */
export const MenuPage: FC = () => {
    const [page, setPage] = useState(1);

    const [currentPlace, setCurrentPlace] = useState<number>();
    const [categoryId, setCategoryId] = useState<number>();

    const [dishes, setDishes] = useState<Dish[]>([]);

    const { data: dishesData, isFetching: isDishesFetching } = useGetDishesByCategoryQuery({
        pageSize: PAGE_SIZE,
        page,
        categoryId: categoryId as number,
        restaurantId: currentPlace as number,
    }, { skip: currentPlace === undefined || categoryId === undefined, });

    const totalPages = useMemo(() => {
        if (dishesData?.totalPages !== undefined) {
            return dishesData.totalPages;
        }
        return null;
    }, [dishesData]);

    const basket = useAppSelector(selectBasket);

    const loaderRef = useRef(null);

    const { isFetching: isPlacesFetching } = useGetRestaurantPlacesQuery(
        { tag: currentPlace?.toString() ?? "" },
        { skip: currentPlace === undefined }
    );

    const changePlaceHandler = (placeId: number) => {
        if (placeId !== currentPlace) {
            setDishes([]);
            setPage(1);
        }
        setCurrentPlace(placeId);
    };

    const changeCategoryIdHandler = (newCategoryId: number) => {
        if (newCategoryId !== categoryId) {
            setDishes([]);
            setPage(1);
        }
        setCategoryId(newCategoryId);
    };

    const {
        data: dishesCategoriesData
    } = useGetDishesCategoriesQuery();

    const dishesCategories = useMemo(() => dishesCategoriesData || [], [dishesCategoriesData]);

    const isSomethingFetching = useMemo(
        () => (isDishesFetching || isPlacesFetching),
        [isDishesFetching, isPlacesFetching]
    );

    useEffect(() => {
        if (dishesData?.results) {
            setDishes((prev) => [...prev, ...dishesData.results]);
        }
    }, [dishesData]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && (totalPages === null || page < totalPages) && !isSomethingFetching) {
                setPage((prevState) => prevState + 1);
            }
        });
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef.current, isSomethingFetching]);

    return (
        <>
            <Box className={styles.menuPage}>
                <MenuBar changePlaceHandler={changePlaceHandler} currentPlace={currentPlace} />
                <Box className={styles.foodCategories}>
                    {
                        !!dishesCategories.length
                  && <FoodCategories categoryId={categoryId} changeCategoryIdHandler={changeCategoryIdHandler} />
                    }
                </Box>
                <Grid className={styles.dishesWrapper} container columnSpacing={3} rowSpacing={4}>
                    {dishes.map((dish) => (
                        <Grid key={dish.id.toString()} item xs={12} sm={12} lg={6} xl={4}>
                            <DishCard key={dish.id.toString()} dish={dish} quantity={basket[dish.id]?.quantity} />
                        </Grid>
                    ))}
                    {
                        ((isDishesFetching || isPlacesFetching) || (totalPages && page < totalPages)) && (
                            <Grid ref={loaderRef} item xs={12}>
                                <Loader />
                            </Grid>
                        )
                    }
                </Grid>
                <Box className={styles.bookingTableFormWrapper}>
                    <Box position="sticky" top="100px">
                        {!!Object.keys(basket).length && <ClientOrderCard />}
                        <BookingTableForm currentPlace={currentPlace} key="BookingTableForm" />
                    </Box>
                </Box>
            </Box>
            <Box height={100} />
        </>
    );
};
