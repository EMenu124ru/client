import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";

import style from "./GreetingText.module.scss";

/**
 * Greeting text to user.
 */
const GreetingTextComponent: FC = () => (
    <Box className={style.wrapper}>
        <Typography variant="h1" className={style.mainText}>
            Добро пожаловать!
        </Typography>
        <Typography variant="body1" className={style.subText}>
            Система “Мобильный официант” меняет привычный поход в ресторан:
            теперь бронирование столика и заказ можно сделать в несколько кликов!
        </Typography>
    </Box>
);

export const GreetingText = memo(GreetingTextComponent);
