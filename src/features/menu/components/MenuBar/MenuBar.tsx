import logo from "@assets/images/logo-black.png";
import { RestaurantsSelector } from "@features/menu/components/RestaurantsSelector";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar, Box, ButtonBase, Container, IconButton, Menu, MenuItem, Toolbar
} from "@mui/material";
import React, { FC, useState } from "react";

import styles from "./MenuBar.module.scss";

interface MenuBarProps {
  currentPlace?: number,
  changePlaceHandler: (placeId: number) => void
}

/**
 * Menu bar.
 */
export const MenuBarComponent: FC<MenuBarProps> = ({
    currentPlace,
    changePlaceHandler
}) => {
    const pages = ["Меню", "Лк", "Что нибудь еще"];
    const [anchorElPages, setAnchorElPages] = useState<null | HTMLElement>(null);

    /**
   * Handler to open pages menu.
   * @param event Event.
   */
    const handleOpenNavPagesMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorElPages(event.currentTarget);
    };

    /**
   * Handler to close pages menu.
   * @param event Event.
   */
    const handleCloseNavPagesMenu = (): void => {
        setAnchorElPages(null);
    };

    return (
        <AppBar component="nav" className={styles.appBar}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img className={styles.logo} src={logo} alt="No source :(" />
                    <Box className={styles.menuPages}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavPagesMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            className={styles.dropDownMenu}
                            anchorEl={anchorElPages}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElPages)}
                            onClose={handleCloseNavPagesMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem className={styles.menuPage} key={page} onClick={handleCloseNavPagesMenu}>
                                    {page}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box className={styles.titlePages}>
                        {pages.map((page) => (
                            <ButtonBase
                                className={styles.titlePage}
                                key={page}
                                onClick={handleCloseNavPagesMenu}
                            >
                                {page}
                            </ButtonBase>
                        ))}
                    </Box>
                    <RestaurantsSelector currentPlace={currentPlace} changePlaceHandler={changePlaceHandler} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export const MenuBar = MenuBarComponent;
