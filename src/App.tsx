import AppProvider from 'components/AppProvider/AppProvider';
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
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/Example" element={<Example />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
