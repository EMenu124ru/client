import { createTheme, PaletteOptions } from "@mui/material";
import { PaletteColor } from "@mui/material/styles/createPalette";
import {
    TypographyOptions,
    Variant,
} from "@mui/material/styles/createTypography";
import { ruRU } from "@mui/x-date-pickers/locales";

import {
    fontFamily,
    FontWeights,
    TypographyVariants,
    typographyVariants,
} from "./typography";

const theme = createTheme();

export const colors = {
    primary: "#D98F00",
    primaryVariant: "#FFE1A7",
    secondary: "#FAEECD",
    black: "#000000",
    white: "#FFFFFF",

};

const palette: PaletteOptions = {
    mode: "light",
    primary: theme.palette.augmentColor({
        color: { main: colors.primary },
    }),
    secondary: theme.palette.augmentColor({
        color: { main: colors.secondary },
    }),
};

export const themeOptions = createTheme(
    {
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
            MuiTypography: { defaultProps: { fontFamily } },
            MuiSelect: {
                styleOverrides: {
                    select: ({ theme: innerTheme }) => ({
                        ...innerTheme.typography.body3,
                        padding: "20px 25px",
                    })
                }
            },

            MuiInputBase: {
                styleOverrides: {
                    root: ({ theme: innerTheme }) => ({
                        fontSize: innerTheme.typography.body3.fontSize,
                        "&>input, &>input:autofill, &>input:-webkit-autofill::first-line": {
                            fontSize: innerTheme.typography.body3.fontSize,
                            border: 0,
                        },
                    })
                },
            },
            // @ts-ignore
            MuiClockNumber: {
                styleOverrides: {
                    root: () => ({
                        ...typographyVariants[TypographyVariants.Body3].style
                    })
                }
            },
            MuiList: {
                styleOverrides: {
                    root: ({ theme: innerTheme }) => ({
                        "&.MuiList-root li": {
                            fontSize: innerTheme.typography.body3.fontSize
                        }
                    })
                }
            },
            MuiButtonBase: {
                styleOverrides: {
                    root: ({ theme: innerTheme }) => ({
                        "&.MuiPickersDay-root.Mui-selected:hover, &.MuiPickersDay-root:focus.Mui-selected": {
                            backgroundColor: innerTheme.palette.primary.light
                        },
                        "&.MuiToggleButton-root.Mui-selected": {
                            backgroundColor: "rgba(0,0,0,0)",
                            color: innerTheme.palette.primary.main
                        },
                        "&.Mui-disabled": {
                            color: innerTheme.palette.grey,
                            backgroundColor: innerTheme.palette.primary.dark
                        },
                    }),

                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        padding: "21px 35px",
                        boxSizing: "border-box",
                        fontSize: "1rem",
                        borderRadius: "10px",
                    },

                },
                variants: [
                    {
                        props: { variant: "contained" },
                        style: {
                            color: colors.white,
                            backgroundColor: colors.primary,
                            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
                            ":hover": {
                                backgroundColor: colors.primary,
                            },
                            "&.Mui-disabled": {
                                backgroundColor: (palette.primary as PaletteColor).dark,
                            },
                        },
                    },
                    {
                        props: { variant: "cardDishButton" },
                        style: {
                            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
                            backgroundColor: colors.primary,
                            borderRadius: "20px",
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            ":hover": {
                                backgroundColor: colors.primary,
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
                    variant: "filled",
                },
                variants: [
                    {
                        props: {
                            variant: "filled",
                        },
                        style: ({ theme: innerTheme }) => ({
                            height: "auto",
                            ".MuiFormHelperText-root": {
                                fontSize: "14px",
                                position: "absolute",
                                bottom: "-24px",
                            },
                            ".MuiFilledInput-root": {
                                color: "black",
                                borderRadius: "10px",
                                height: "auto",
                                backgroundColor: colors.primaryVariant,
                                boxSizing: "border-box",
                                padding: "21px 35px",
                                border: `1px solid ${colors.primaryVariant}`,

                                "& .MuiInputBase-input:focus": {
                                    borderRadius: "10px",
                                },

                                "&.Mui-focused": {
                                    "&:hover": {
                                        backgroundColor: colors.primaryVariant,
                                    },
                                },

                                "&.Mui-error": {
                                    border: "1px solid red",
                                },

                                "& input": {
                                    fontSize: innerTheme.typography.body3.fontSize,
                                    color: colors.black,
                                    opacity: 0.5,
                                    padding: "0",
                                },
                                "&:hover": {
                                    backgroundColor: colors.primaryVariant,
                                },
                            },
                        }),
                    },
                    {
                        props: {
                            variant: "standard"
                        },
                        style: ({ theme: innerTheme }) => ({
                            height: "auto",
                            ".MuiFormHelperText-root": {
                                fontSize: "14px",
                                position: "absolute",
                                bottom: "-24px",
                            },
                            ".MuiInputBase-root": {
                                color: "black",
                                borderRadius: "20px",
                                height: "auto",
                                backgroundColor: colors.secondary,
                                boxSizing: "border-box",
                                padding: "20px 25px",
                                border: `1px solid ${colors.secondary}`,

                                "&.Mui-focused": {
                                    "&:hover": {
                                        backgroundColor: colors.secondary,
                                    },
                                    backgroundColor: colors.secondary,
                                },

                                "&.Mui-error": {
                                    border: "1px solid red",
                                },

                                "& input": {
                                    fontSize: innerTheme.typography.body3.fontSize,
                                    color: colors.black,
                                    opacity: 0.5,
                                    padding: "0",
                                },
                                "&:hover": {
                                    backgroundColor: colors.secondary,
                                },
                            },
                        }),
                    }
                ],
                styleOverrides: {
                    root: {
                        height: "3em",
                    },
                },
            },
        },
    },
    ruRU
);
