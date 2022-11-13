import { AppBar, Box, ButtonBase, Container, IconButton, ListSubheader, Menu, MenuItem, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { FC, memo, useState } from 'react';
import logo from '@assets/images/logo-black.png';
import styles from './MenuBar.module.scss';

/**
 * Menu bar.
 */
export const MenuBarComponent: FC = () => {
  const pages = ['Меню', 'Лк', 'Что нибудь еще'];

  const places = {
    // eslint-disable-next-line
    'Красноярск': [
      'Перцы на ул. Мира, 2',
      'Перцы на ул. Пушкина, 2',
      'Ромбаба на ул. Пушкина, 2',
    ],
    // eslint-disable-next-line
    'Новосибирск': [
      'Перцы на ул. Мира, 2',
      'Перцы на ул. Пушкина, 2',
      'Ромбаба на ул. Пушкина, 2',
    ],
  };

  const [anchorElPages, setAnchorElPages] = useState<null | HTMLElement>(null);
  const [anchorElPlaces, setAnchorElPlaces] = useState<null | HTMLElement>(null);
  const [currentPlace, setCurrentPlace] = useState<null | string>(null);

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

  /**
   * Handler to select place.
   * @param event Event.
   */
  const handlerSelectPlace = (event: React.MouseEvent<HTMLElement>): void => {
    setCurrentPlace(event.currentTarget.innerText);
    handleCloseNavPlacesMenu();
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElPages)}
              onClose={handleCloseNavPagesMenu}
            >
              {pages.map(page => (
                <MenuItem className={styles.menuPage} key={page} onClick={handleCloseNavPagesMenu}>
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box className={styles.titlePages}>
            {pages.map(page => (
              <ButtonBase
                className={styles.titlePage}
                key={page}
                onClick={handleCloseNavPagesMenu}
              >
                {page}
              </ButtonBase>
            ))}
          </Box>
          <Box className={styles.places}>
            <ButtonBase onClick={handleOpenNavPlacesMenu}>
              <NearMeIcon />
              {currentPlace ?? ''}
            </ButtonBase>
            <Menu
              className={styles.popOverMenuPlaces}
              anchorEl={anchorElPlaces}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              open={Boolean(anchorElPlaces)}
              onClose={handleCloseNavPlacesMenu}
            >
              {Object.entries(places)
                .map(([area, placesToRender]) => (
                  [
                    <ListSubheader key={area} className={styles.menuArea}>
                      {area}
                    </ListSubheader>,
                    placesToRender.map(place => (
                      <MenuItem value={place} onClick={handlerSelectPlace} className={styles.menuPlace} key={place}>{place}</MenuItem>
                    )),
                  ]
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export const MenuBar = memo(MenuBarComponent);
