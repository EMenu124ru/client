import { CSSProperties } from '@mui/material/styles/createMixins';

export const fontFamily: CSSProperties['fontFamily'] = '"Raleway", sans-serif';

/** Font weights.*/
export enum FontWeights {
  Regular = 500,
  SemiBold = 700,
}

/** Typography variant config.*/
interface TypographyVariantConfig {

  /** Tag. */
  tagName: keyof HTMLElementTagNameMap;

  /** Typography styles. */
  style: CSSProperties;
}

/** Typography variants. */
export enum TypographyVariants {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  Headline1 = 'headline1',
  Headline2 = 'headline2',
  Headline3 = 'headline3',
  Headline4 = 'headline4',
  Body1 = 'body1',
  Body2 = 'body2',
  Body3 = 'body3',
  Caption1 = 'caption1',
  Caption2 = 'caption2',
  Caption3 = 'caption3',
}

export const typographyVariants: Record<TypographyVariants, TypographyVariantConfig> = {
  [TypographyVariants.H1]: {
    tagName: 'h1',
    style: {
      fontSize: 44,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.64,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.H2]: {
    tagName: 'h2',
    style: {
      fontSize: 36,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.56,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.H3]: {
    tagName: 'h3',
    style: {
      fontSize: 36,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.52,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.H4]: {
    tagName: 'h4',
    style: {
      fontSize: 32,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.48,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.H5]: {
    tagName: 'h5',
    style: {
      fontSize: 28,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.44,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.H6]: {
    tagName: 'h6',
    style: {
      fontSize: 24,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.4,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Headline1]: {
    tagName: 'h6',
    style: {
      fontSize: 20,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.36,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Headline2]: {
    tagName: 'h6',
    style: {
      fontSize: 18,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.32,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Headline3]: {
    tagName: 'h6',
    style: {
      fontSize: 16,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.28,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Headline4]: {
    tagName: 'h6',
    style: {
      fontSize: 14,
      fontWeight: FontWeights.SemiBold,
      letterSpacing: -0.12,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Body1]: {
    tagName: 'p',
    style: {
      fontSize: 28,
      fontWeight: FontWeights.Regular,
      letterSpacing: -0.16,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Body2]: {
    tagName: 'p',
    style: {
      fontSize: 24,
      fontWeight: FontWeights.Regular,
      letterSpacing: -0.12,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Body3]: {
    tagName: 'p',
    style: {
      fontSize: 20,
      fontWeight: FontWeights.Regular,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Caption1]: {
    tagName: 'p',
    style: {
      fontSize: 12,
      fontWeight: FontWeights.Regular,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Caption2]: {
    tagName: 'p',
    style: {
      fontSize: 10,
      fontWeight: FontWeights.Regular,
      letterSpacing: 0.08,
      lineHeight: 'normal',
    },
  },
  [TypographyVariants.Caption3]: {
    tagName: 'p',
    style: {
      fontSize: 8,
      fontWeight: FontWeights.Regular,
      letterSpacing: 0.12,
      lineHeight: 'normal',
    },
  },
};
