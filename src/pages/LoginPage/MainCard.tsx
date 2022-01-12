import { Card, useTheme } from '@mui/material';
import React, { forwardRef } from 'react';
interface PropsMainCardChildren {
  children: React.ReactNode;
  sx: object;
  content: boolean;
}

const MainCard = forwardRef(
  ({ children, sx, content }: PropsMainCardChildren): JSX.Element => {
    const theme = useTheme();
    return (
      <Card
        sx={{
          border: '1px solid',
          borderColor: theme.palette.primary.main,
          ':hover': {
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          },
          ...sx,
        }}
      >
        {!content && children}
      </Card>
    );
  }
);
MainCard.displayName = 'MainCard';
export default MainCard;
