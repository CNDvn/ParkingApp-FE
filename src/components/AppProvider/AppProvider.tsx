/* eslint-disable @typescript-eslint/ban-types */
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { PropsWithChildren, Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import theme from 'Mui/theme';
import { store } from 'store/store';

export type AppProviderProps = {};

const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = (props) => {
  const { children } = props;

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback>{children}</Suspense>
        </BrowserRouter>
      </ThemeProvider>
      <CssBaseline />
    </ReduxProvider>
  );
};

export default React.memo(AppProvider);
