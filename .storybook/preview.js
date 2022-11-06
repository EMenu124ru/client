import {themeOptions} from "../src/theme/themeOptions";
import {ThemeProvider} from "@mui/material";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themeOptions}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
