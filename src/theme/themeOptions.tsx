import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {

    /** Auth main button theme. */
    'authMain': true;
  }
}

export const themeOptions = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'authMain' },
          style: {
            'backgroundColor': '#D98F00',
            'boxShadow': '0px 4px 25px rgba(0, 0, 0, 0.08)',
            'width': '100%',
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
