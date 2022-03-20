import AppProvider from 'components/AppProvider/AppProvider';
import LoginPage from 'pages/LoginPage/LoginPage';
import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { IPage, routesAdmin } from 'routes/AdminTemplateRouting';
import PrivateRoute from 'template/privateRouting';

import './App.css';
const App = (): JSX.Element => {
  const routesAdminFn = (routesAdmin: IPage[]): JSX.Element[] | undefined => {
    if (routesAdmin.length > 0) {
      return routesAdmin.map((item: IPage) => {
        const Component = item.element;
        return (
          <Route
            path={item.path}
            key={item.path}
            element={
              <PrivateRoute>
                <Component />
              </PrivateRoute>
            }
          />
        );
      });
    }
  };
  return (
    <AppProvider>
      <Routes>
        {routesAdminFn(routesAdmin)}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
