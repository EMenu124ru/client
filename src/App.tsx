import ru from 'date-fns/locale/ru';
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { store } from './store';
import { themeOptions } from './theme/themeOptions';
import { RootRouter } from './routes/RootRouter';

/** App component. */
const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
        <ThemeProvider theme={themeOptions}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <SnackbarProvider autoHideDuration={5000}>
              <RootRouter />
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </Provider>
);

export default App;
