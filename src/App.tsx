import AppProvider from 'components/AppProvider/AppProvider';
import { PATH_NAME } from 'config/path';
import DashboardAdmin from 'pages/DashboardAdmin/DashboardAdmin';
import Example from 'pages/Example/Example';
import LoginPage from 'pages/LoginPage/LoginPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <Routes>
        <Route path={PATH_NAME.DashboardAdmin} element={<DashboardAdmin />} />
        <Route path={PATH_NAME.Example} element={<Example />} />
        <Route path={PATH_NAME.Login} element={<LoginPage />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
