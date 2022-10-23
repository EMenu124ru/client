import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';
import './GreetingText.scss';

/**
 * Greeting text to user.
 */
const GreetingTextComponent: FC = () => (
  <Box className="auth__hello_guest_text">
    <Typography variant="h3" className="auth__hello_guest_main_text">
      Добро пожаловать!
    </Typography>
    <Typography variant="body1" className="auth__hello_guest_sub_text">
      Система “Мобильный официант” меняет привычный поход в ресторан:
      теперь бронирование столика и заказ можно сделать в несколько кликов!
    </Typography>
  </Box>
);

export const GreetingText = memo(GreetingTextComponent);
