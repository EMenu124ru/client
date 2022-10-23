import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { store } from './store';
import { themeOptions } from './theme/themeOptions';
import { RootRouter } from './routes/RootRouter';

/** App component. */
const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Brrr... here should be your loader component</div>}>
        <ThemeProvider theme={themeOptions}>
          <RootRouter />
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  </Provider>
);

export default App;
