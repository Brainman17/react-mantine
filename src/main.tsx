import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { MantineProvider, createTheme, Loader } from '@mantine/core';
import './app/lib/firebase.config.ts';
import './shared/lib/i18n.ts';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
  primaryShade: 8,
});

// const { t } = useTranslation();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Provider store={store}>
        <Suspense fallback={<Loader color={'cyan'} />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
