import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useGetDishesCategoriesQuery } from "@store/dishCategories/api";
import React, {
    FC, useEffect, useMemo
} from "react";

interface FoodCategoriesProps {
  categoryId?: number
  changeCategoryIdHandler: (categoryId: number) => void
}

/**
 * Food dishCategories column.
 */
export const FoodCategories: FC<FoodCategoriesProps> = ({
    categoryId,
    changeCategoryIdHandler,
}) => {
    const {
        data: dishesCategoriesData
    } = useGetDishesCategoriesQuery();

    const dishesCategories = useMemo(() => dishesCategoriesData || [], [dishesCategoriesData]);

    const onChangeCategoryId = (event: React.MouseEvent<HTMLElement>, value: number | null) => {
        if (value !== null) {
            changeCategoryIdHandler(value);
        }
    };

    useEffect(() => {
        if (categoryId === undefined && dishesCategories.length) {
            changeCategoryIdHandler(dishesCategories[0].id);
        }
    }, [dishesCategories]);

    return (
        <ToggleButtonGroup
            onChange={onChangeCategoryId}
            value={categoryId}
            sx={{
                borderRadius: "20px",
                boxSizing: "border-box",
                padding: "24px 30px",
                bgcolor: "secondary.main",
                gap: "10px",
            }}
            orientation="vertical"
            exclusive
        >
            {dishesCategories.map((item) => (
                <ToggleButton
                    sx={{
                        textTransform: "none",
                        border: "0",
                    }}
                    value={item.id}
                >
                    <Typography
                        color={categoryId === item.id ? "primary.main" : "black"}
                        fontWeight="700"
                        variant="body2"
                    >
                        {item.name}
                    </Typography>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};
