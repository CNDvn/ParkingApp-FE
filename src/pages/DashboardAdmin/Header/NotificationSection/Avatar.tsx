import React, { PropsWithChildren } from 'react';
import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IAvatarSection {
  open?: boolean;
  handleToggle: VoidFunction;
  children: React.ReactNode;
}
export type Ref = HTMLDivElement;
const AvatarSection = React.forwardRef<Ref, PropsWithChildren<IAvatarSection>>(
  (props, ref): React.ReactElement | null => {
    const theme = useTheme();
    const { open, handleToggle, children, ...rest } = props;
    return (
      <Avatar
        {...rest}
        variant="rounded"
        sx={{
          cursor: 'pointer',
          borderRadius: '8px',
          width: '34px',
          height: '34px',
          fontSize: '1.2rem',
          transition: 'all .2s ease-in-out',
          background: theme.palette.primary.main,
          color: theme.palette.primary.dark,
          '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.primary.main,
            color: theme.palette.primary.light,
          },
        }}
        ref={ref}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        {children}
      </Avatar>
    );
  }
);

AvatarSection.displayName = 'AvatarSection';
export default AvatarSection;
