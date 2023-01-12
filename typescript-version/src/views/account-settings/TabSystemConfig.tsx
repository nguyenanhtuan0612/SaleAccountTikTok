// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// ** Icons Imports

interface State {
  exchangeRate: number;
  discountForColaborator: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  secureToken: string;
}

const TabSystemConfig = () => {
  // ** States
  const [values, setValues] = useState<State>({
    exchangeRate: 0,
    discountForColaborator: 0,
    accountName: '',
    accountNumber: '',
    bankName: '',
    secureToken: ''
  });

  // Handle Current Password
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='discountForColaborator'>Chiết khấu cho cộng tác viên</InputLabel>
                  <OutlinedInput
                    label='Chiết khấu cho cộng tác viên'
                    value={values.discountForColaborator}
                    id='discountForColaborator'
                    type={'number'}
                    onChange={handleCurrentPasswordChange('discountForColaborator')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='exchangeRate'>Tỉ giá quy đổi $</InputLabel>
                  <OutlinedInput
                    label='Tỉ giá quy đổi $'
                    value={values.exchangeRate}
                    id='exchangeRate'
                    onChange={handleNewPasswordChange('exchangeRate')}
                    type={'number'}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='secureToken'>Seruce Token Casso</InputLabel>
                  <OutlinedInput
                    label='Seruce Token Casso'
                    value={values.secureToken}
                    id='secureToken'
                    type={'text'}
                    onChange={handleConfirmNewPasswordChange('secureToken')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bankName'>Tên ngân hàng</InputLabel>
                  <OutlinedInput
                    label='Tên ngân hàng'
                    value={values.bankName}
                    id='bankName'
                    type={'text'}
                    onChange={handleConfirmNewPasswordChange('bankName')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='accountNumber'>Số tài khoản</InputLabel>
                  <OutlinedInput
                    label='Số tài khoản'
                    value={values.accountNumber}
                    id='accountNumber'
                    type={'text'}
                    onChange={handleConfirmNewPasswordChange('accountNumber')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='accountName'>Tên chủ tài khoản</InputLabel>
                  <OutlinedInput
                    label='Tên chủ tài khoản'
                    value={values.accountName}
                    id='accountName'
                    type={'text'}
                    onChange={handleConfirmNewPasswordChange('accountName')}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 3 }}>
          <Button variant='contained' sx={{ marginRight: 2 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() =>
              setValues({
                ...values,
                exchangeRate: 0,
                discountForColaborator: 0,
                accountName: '',
                accountNumber: '',
                bankName: '',
                secureToken: ''
              })
            }
          >
            Reset
          </Button>
        </Box>
      </CardContent>

      {/* <Divider sx={{ margin: 0 }} /> */}

      {/* <CardContent></CardContent> */}
    </form>
  );
};
export default TabSystemConfig;
