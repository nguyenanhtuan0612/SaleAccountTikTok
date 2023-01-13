// ** MUI Imports
import { Backdrop, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AccountTikTok } from 'src/@core/models/AccountTikTok.model';
import { Account } from 'src/@core/models/UserInfo.model';

// ** Demo Components Imports
import CardAppleWatch from 'src/views/cards/CardAppleWatch';

const Product = () => {
  const [listAccounts, setlistAccounts] = useState<Array<AccountTikTok>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const [account, setAccount] = useState<Account>({ role: '', id: '', email: '', balance: 0 });

  useEffect(() => {
    const acc = JSON.parse(localStorage.getItem('account') || '{}');
    if (acc) {
      setAccount(acc);
    }
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjRkMzU2MDdhLWFjYWEtNDc3NS05OGVhLTliMWRkYTVlYjg3MCIsImlhdCI6MTY3MzA2Mjg5OCwiZXhwIjoxNzA0NTk4ODk4fQ.hjnpzFJWG52YXKhX_n_bm1TYH5z77k6wC3_NNcR5Ii8';
    const url = 'http://localhost:5001/api/tiktokAccount';
    const data = axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setLoading(false);
        setlistAccounts(res.data.rows);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    return;
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h6'>{'Danh sách tài khoản Tiktok'}</Typography>
      </Grid>
      {listAccounts.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardAppleWatch data={item} />
        </Grid>
      ))}
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  );
};

export default Product;
