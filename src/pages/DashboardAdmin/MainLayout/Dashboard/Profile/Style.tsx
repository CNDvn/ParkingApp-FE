import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: 8,
      marginBottom: 8,
      '& > label': {
        top: 23,
        left: 0,
        color: 'rgb(33, 33, 33)',
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    input: {
      borderRadius: '12px',
      background: 'rgb(250, 250, 250)',
      fontWeight: 500,
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  })
);
