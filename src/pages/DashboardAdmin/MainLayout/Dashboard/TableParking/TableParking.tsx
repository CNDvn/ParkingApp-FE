import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const TableParking = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>TableParking</h1>
      <Button
        onClick={(): void => {
          navigate(
            '/DashboardAdmin/parking/155dbd7a-624c-475f-aba7-7df34a62bbc6'
          );
        }}
      >
        Detail Parking
      </Button>
    </div>
  );
};

export default TableParking;
