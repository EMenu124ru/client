import { FontWeights } from './typography';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {

    /** Auth main button theme. */
    authMain: true;

    /** Image card button theme. */
    cardDishButton: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {

    /** Font weight semi bold. */
    fontWeightSemiBold: FontWeights;
  }
}
