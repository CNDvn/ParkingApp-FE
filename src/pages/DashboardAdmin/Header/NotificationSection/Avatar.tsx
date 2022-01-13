import React, { forwardRef } from 'react';
import { Avatar } from '@mui/material';
import { IconBell } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';

interface IAvatarSection {
  open: boolean;
  handleToggle: VoidFunction; 
}

type AvatarRef = React.HTMLProps<HTMLElement>

const AvatarSection = forwardRef<HTMLElement,React.PropsWithChildren<IAvatarSection>>(({open, handleToggle}: IAvatarSection, anchorRef: React.Ref<HTMLElement>): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <Avatar
        variant="rounded"
        sx={{
          cursor: 'pointer',
          borderRadius: '8px',
          width: '34px',
          height: '34px',
          fontSize: '1.2rem',
          transition: 'all .2s ease-in-out',
          background: theme.palette.secondary.light,
          color: theme.palette.secondary.dark,
          '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light,
          },
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        <IconBell stroke={1.5} size="1.3rem" />
      </Avatar>
    </>
  );
});
AvatarSection.displayName = 'AvatarSection';
export default AvatarSection;
