import { createTheme, PaletteOptions } from '@mui/material';
import { ruRU } from '@mui/x-date-pickers/locales';
import { PaletteColor } from '@mui/material/styles/createPalette';
import {
  TypographyOptions,
  Variant,
} from '@mui/material/styles/createTypography';
import {
  fontFamily,
  FontWeights,
  typographyVariants,
} from './typography';

const theme = createTheme();

const colors = {
  primary: '#D98F00',
  primaryVariant: '#FFE1A7',
  secondary: '#FAEECD',
  black: '#000000',
  white: '#FFFFFF',

};

const palette: PaletteOptions = {
  mode: 'light',
  primary: theme.palette.augmentColor({
    color: { main: colors.primary },
  }),
  secondary: theme.palette.augmentColor({
    color: { main: colors.secondary },
  }),
};

export const themeOptions = createTheme({
  palette,
  typography: {
    fontFamily,
    fontSize: 12,
    fontWeightRegular: FontWeights.Regular,
    ...Object.entries(typographyVariants).reduce<TypographyOptions>((acc, [key, value]) => {
      acc[key as Variant] = value.style;
      return acc;
    }, {} as TypographyOptions),
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '21px 35px',
          boxSizing: 'border-box',
          fontSize: '1rem',
          borderRadius: '10px',

        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            'color': colors.white,
            'backgroundColor': colors.primary,
            'boxShadow': '0px 4px 25px rgba(0, 0, 0, 0.08)',
            ':hover': {
              backgroundColor: '#D98F00',
            },
            '&.Mui-disabled': {
              backgroundColor: (palette.primary as PaletteColor).dark,
            },
          },
        },
        {
          props: { variant: 'cardDishButton' },
          style: {
            'boxShadow': '0px 4px 25px rgba(0, 0, 0, 0.08)',
            'backgroundColor': '#D98F00',
            'borderRadius': '20px',
            'width': '80%',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ':hover': {
              backgroundColor: '#D98F00',
            },
          },
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          disableUnderline: true,
        },
        variant: 'filled',
      },
      variants: [
        {
          props: {
            variant: 'filled',
          },
          style: ({ theme: innerTheme }) => ({
            'height': 'auto',
            '.MuiFormHelperText-root': {
              position: 'absolute',
              bottom: '-20px',
            },
            '.MuiFilledInput-root': {
              'color': 'black',
              'borderRadius': '10px',
              'height': 'auto',
              'backgroundColor': colors.primaryVariant,
              'boxSizing': 'border-box',
              'padding': '21px 35px',
              'border': `1px solid ${colors.primaryVariant}`,

              '&.Mui-focused': {
                '&:hover': {
                  backgroundColor: colors.primaryVariant,
                },
                'backgroundColor': colors.primaryVariant,
              },

              '&.Mui-error': {
                border: '1px solid red',
              },

              '& input': {
                fontSize: innerTheme.typography.body2.fontSize,
                color: colors.black,
                opacity: 0.5,
                padding: '0',
              },
              '&:hover': {
                backgroundColor: colors.primaryVariant,
              },
            },
          }),
        },
      ],
      styleOverrides: {
        root: {
          height: '3em',
        },
      },
    },
  },
},
ruRU);
