import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {

    /** Auth main button theme. */
    'authMain': true;

    /** Image card button theme. */
    'cardDishButton': true;
  }
}

export const themeOptions = createTheme({
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
        variant: 'standard',
        inputProps: {
          style: {
            boxSizing: 'border-box',
            paddingTop: '0.75em',
            paddingLeft: '0.75em',
          },
        },
        InputProps: {
          disableUnderline: true,
        },
      },
      styleOverrides: {
        root: {
          height: '3em',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#CD8700',
    },
    secondary: {
      main: '#FAEECD',
    },
    text: {
      secondary: '#3C2700',
      primary: '#FFFFFF',
    },
  },
});
