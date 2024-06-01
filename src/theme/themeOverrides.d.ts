import { FontWeights, TypographyVariants as NewTypographyVariants } from "./typography";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {

    /** Auth main button theme. */
    authMain: true;

    /** Image card button theme. */
    cardDishButton: true;
  }

}

declare module "@mui/material/styles" {

  interface TypographyVariants extends Record<NewTypographyVariants, TypographyVariantConfig> {
  }
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions extends Partial<Record<NewTypographyVariants, TypographyVariantConfig>> {
    /** Font weight semi bold. */
    fontWeightSemiBold: FontWeights;
  }

}

type TypographyPropsVariants = Record<NewTypographyVariants, true>;
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true
    h2: true
    h3: true
    h4: true
    h5: true
    h6: true
    headline1: true
    headline2: true
    headline3: true
    headline4: true
    body1: true
    body2: true
    body3: true
    caption1: true
    caption2: true
    caption3: true
    fontWeightSemiBold: true
  }
}
