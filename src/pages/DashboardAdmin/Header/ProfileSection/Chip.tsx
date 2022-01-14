import React, { PropsWithChildren } from 'react';
import { Avatar, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons';

interface IChipSection {
  open: boolean;
  handleToggle: VoidFunction;
}

export type Ref = HTMLDivElement;
const ChipSection = React.forwardRef<Ref, PropsWithChildren<IChipSection>>(
  (props, anchorRef): React.ReactElement | null => {
    const theme = useTheme();
    const { open, handleToggle } = props;
    return (
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src="../../../../../svg/user-round.svg"
            sx={{
              width: '34px',
              height: '34px',
              fontSize: '1.2rem',
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
    );
  }
);

ChipSection.displayName = 'ChipSection';
export default ChipSection;
