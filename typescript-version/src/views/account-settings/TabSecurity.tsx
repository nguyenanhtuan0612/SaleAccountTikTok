// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// ** Icons Imports
import { Backdrop, CircularProgress, FormHelperText, Snackbar } from '@mui/material';
import axios from 'axios';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import EyeOutline from 'mdi-material-ui/EyeOutline';

interface State {
  newPassword: string;
  currentPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showCurrentPassword: boolean;
  showConfirmNewPassword: boolean;
}

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  });

  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [messageToast, setMessageToast] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleCloseLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    if (event.target.value !== values.confirmNewPassword) {
      setError(true);
      setMessageError('M???t kh???u m???i kh??ng kh???p');
    } else {
      setError(false);
      setMessageError('');
    }
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
    if (event.target.value !== values.newPassword) {
      setError(true);
      setMessageError('M???t kh???u m???i kh??ng kh???p');
    } else {
      setError(false);
      setMessageError('');
    }
  };
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleCloseToast = () => {
    setTimeout(() => {
      setOpenToast(false);
    }, 2000);
  };

  const handleSubmitChangePassword = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const url = `${process.env.apiUrl}/api/auth/changePassword`;
    await axios
      .put(
        url,
        { currentPassword: values.currentPassword, newPassword: values.newPassword },
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      )
      .then(() => {
        setMessageToast('?????i m???t kh???u th??nh c??ng !!');
        setOpenToast(true);
        handleCloseToast();
      })
      .catch(({ response }) => {
        if (response && response.data?.code == 28) {
          setMessageToast('M???t kh???u hi???n t???i kh??ng ????ng');
          setOpenToast(true);
          handleCloseToast();

          return true;
        }
        setMessageToast('???? c?? l???i x???y ra');
        setOpenToast(true);
        handleCloseToast();

        return true;
      });
    handleCloseLoading();
  };

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>M???t kh???u hi???n t???i</InputLabel>
                  <OutlinedInput
                    label='M???t kh???u hi???n t???i'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>M???t kh???u m???i</InputLabel>
                  <OutlinedInput
                    error={error}
                    label='M???t kh???u m???i'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Nh???p l???i m???t kh???u</InputLabel>
                  <OutlinedInput
                    error={error}
                    label='Nh???p l???i m???t kh???u'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error>{messageError}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 3, marginBottom: 8 }}>
          <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleSubmitChangePassword}>
            L??u thay ?????i
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            ?????t l???i
          </Button>
        </Box>
      </CardContent>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openToast}
        onClose={handleCloseToast}
        message={messageToast}
        key={'top' + 'right'}
      />
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </form>
  );
};
export default TabSecurity;
