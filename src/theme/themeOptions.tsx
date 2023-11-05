import { createTheme } from '@mui/material';
import { ruRU } from '@mui/x-date-pickers/locales';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {

    /** Auth main button theme. */
    'authMain': true;

    /** Image card button theme. */
    'cardDishButton': true;
  }
}

const colors = {
  primary: '#D98F00',
  primaryVariant: '#FFE1A7',
  secondary: '#FAEECD',
  black: '#000000',

};

export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'authMain' },
          style: {
            'color': '#FFE1A7',
            'backgroundColor': '#D98F00',
            'boxShadow': '0px 4px 25px rgba(0, 0, 0, 0.08)',
            'width': '100%',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ':hover': {
              backgroundColor: '#D98F00',
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
          style: {
            '.MuiFilledInput-root': {
              'color': 'black',
              'borderRadius': '10px',
              'height': 'auto',
              'backgroundColor': colors.primaryVariant,
              'boxSizing': 'border-box',
              'padding': '21px 35px',

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
                color: colors.black,
                opacity: 0.5,
                padding: '0',
              },
              '&:hover': {
                backgroundColor: colors.primaryVariant,
              },
            },
          },
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
