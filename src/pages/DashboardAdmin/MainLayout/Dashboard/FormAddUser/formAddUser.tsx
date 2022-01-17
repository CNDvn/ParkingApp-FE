import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { User } from 'models/user';
import { Avatar, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useStyles } from 'pages/LoginPage/AuthLogin/style';
import { stringAvatar } from 'utils/handleAvarta';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
interface IFormAddUser {
  openForm: boolean;
  handleCloseForm: VoidFunction;
  title: string;
  userSelect?: User;
}
export default function FormAddUser({
  openForm,
  handleCloseForm,
  title,
  userSelect,
}: IFormAddUser): JSX.Element {
  console.log(userSelect);
  const classes = useStyles();
  return (
    <div>
      <Modal
        keepMounted
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            align="center"
            component="h2"
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {userSelect && (
              <Avatar
                {...stringAvatar(userSelect?.fullName as string)}
                src={userSelect?.avatar}
              />
            )}
          </Box>

          <form>
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                UserName
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                id="outlined-adornment-email-login"
                name="username"
                label="Username"
                inputProps={{}}
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.formControl}
              //   error={Boolean(touched.username && errors.username)}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                id="outlined-adornment-email-login"
                name="username"
                label="Username"
                inputProps={{}}
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                firstName
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                id="outlined-adornment-email-login"
                name="username"
                label="Username"
                inputProps={{}}
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                lastName
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                id="outlined-adornment-email-login"
                name="username"
                label="Username"
                inputProps={{}}
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                phone
              </InputLabel>
              <OutlinedInput
                className={classes.input}
                id="outlined-adornment-email-login"
                name="username"
                label="Username"
                inputProps={{}}
              />
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
