import AppProvider from 'components/AppProvider/AppProvider';
import { PATH_NAME } from 'config/path';
import DashboardAdmin from 'pages/DashboardAdmin/DashboardAdmin';
import ParkingDetailLogic from 'pages/DashboardAdmin/MainLayout/Dashboard/PakringDetail/ParkingDetail.logic';
import ProfileLogic from 'pages/DashboardAdmin/MainLayout/Dashboard/Profile/Profile.logic';
import TableParking from 'pages/DashboardAdmin/MainLayout/Dashboard/TableParking/TableParking';
import TableParkingProcess from 'pages/DashboardAdmin/MainLayout/Dashboard/TableParking/tableParkingProcess';
import TablePayment from 'pages/DashboardAdmin/MainLayout/Dashboard/TablePayment/tablePayment';
import TableUser from 'pages/DashboardAdmin/MainLayout/Dashboard/TableUser/tableUser';
import LoginPage from 'pages/LoginPage/LoginPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'template/privateRouting';

import './App.css';
const AdminTemplate = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  return (
    <>
      <DashboardAdmin>{children}</DashboardAdmin>
    </>
  );
};
const App = (): JSX.Element => {
  return (
    <AppProvider>
      <Routes>
        <Route
          path={PATH_NAME.DashboardAdminUser}
          element={
            <PrivateRoute>
              <AdminTemplate>
                <TableUser />
              </AdminTemplate>
            </PrivateRoute>
          }
        />
        <Route
          path={PATH_NAME.DashboardAdminParking}
          element={
            <PrivateRoute>
              <AdminTemplate>
                <TableParking />
              </AdminTemplate>
            </PrivateRoute>
          }
        />
        <Route
          path={PATH_NAME.DetailParking}
          element={
            <PrivateRoute>
              <AdminTemplate>
                <ParkingDetailLogic />
              </AdminTemplate>
            </PrivateRoute>
          }
        />
        <Route
          path={PATH_NAME.DashboardAdminPayment}
          element={
            <PrivateRoute>
              <AdminTemplate>
                <TablePayment />
              </AdminTemplate>
            </PrivateRoute>
          }
        />

        <Route
          path={PATH_NAME.Profile}
          element={
            <PrivateRoute>
              <AdminTemplate>
                <ProfileLogic />
              </AdminTemplate>
            </PrivateRoute>
          }
        />
        <Route
          path={PATH_NAME.DashboardAdminParkingProcess}
          element={
            <PrivateRoute>
              <AdminTemplate>
                <TableParkingProcess />
              </AdminTemplate>
            </PrivateRoute>
          }
        />

        <Route path="/" element={<LoginPage />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
