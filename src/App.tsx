import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthProvider } from "@routes/providers/AuthProvider";
import { RootRouter } from "@routes/RootRouter";
import ru from "date-fns/locale/ru";
import { SnackbarProvider } from "notistack";
import type { FC } from "react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store";
import { themeOptions } from "./theme/themeOptions";

/** App component. */
const App: FC = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
                <ThemeProvider theme={themeOptions}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                        <SnackbarProvider autoHideDuration={5000}>
                            <AuthProvider>
                                <RootRouter />
                            </AuthProvider>
                        </SnackbarProvider>
                    </LocalizationProvider>
                </ThemeProvider>
            </Suspense>
        </BrowserRouter>
    </Provider>
);

export default App;
