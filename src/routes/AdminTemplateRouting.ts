import { PATH_NAME } from 'config/path';
import ParkingDetailLogic from 'pages/DashboardAdmin/MainLayout/Dashboard/PakringDetail/ParkingDetail.logic';
import ProfileLogic from 'pages/DashboardAdmin/MainLayout/Dashboard/Profile/Profile.logic';
import TableParking from 'pages/DashboardAdmin/MainLayout/Dashboard/TableParking/TableParking';
import TableParkingProcess from 'pages/DashboardAdmin/MainLayout/Dashboard/TableParking/tableParkingProcess';
import TablePayment from 'pages/DashboardAdmin/MainLayout/Dashboard/TablePayment/tablePayment';
import TableBanUser from 'pages/DashboardAdmin/MainLayout/Dashboard/TableUser/tableBanUser';
import TableUser from 'pages/DashboardAdmin/MainLayout/Dashboard/TableUser/tableUser';
export interface IPage {
    path: string;
    element: React.ComponentType;
}
export const routesAdmin: IPage[] = [
    {
        path: PATH_NAME.DashboardAdminUser,
        element: TableUser
    },
    {
        path: PATH_NAME.DashboardAdminParking,
        element: TableParking
    },
    {
        path: PATH_NAME.DetailParking,
        element: ParkingDetailLogic
    },
    {
        path: PATH_NAME.DashboardAdminPayment,
        element: TablePayment
    },
    {
        path: PATH_NAME.Profile,
        element: ProfileLogic
    },
    {
        path: PATH_NAME.DashboardAdminParkingProcess,
        element: TableParkingProcess
    },
    {
        path: PATH_NAME.DashboardAdminBanUser,
        element: TableBanUser
    },
];