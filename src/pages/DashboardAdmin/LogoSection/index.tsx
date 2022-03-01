import { ButtonBase } from '@mui/material';
import React from 'react';
// ==============================|| MAIN LOGO ||============================== //
interface PropsDefault {
  children: React.ReactNode;
}
const LogoSection = ({ children }: PropsDefault): JSX.Element => {
  return <ButtonBase>{children}</ButtonBase>;
};

export default LogoSection;
