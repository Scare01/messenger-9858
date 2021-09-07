import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Box,
} from '@material-ui/core';
import { login } from './store/utils/thunkCreators';
import { useStyles } from './styles';

import './index.css';

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <Grid container classes={{ root: classes.mainContainer}}>
      <Grid item lg={5} md={12} sm={0} justifyContent='flex-start'>
        <Box className='logo' />
      </Grid>

      <Grid item lg={7} md={12} sm={12} container justifyContent='center' alignItems='center' classes={{ root: classes.loginSignupContainer }}>
        <Grid lg={7} md={12} sm={12} container classes={{ root: classes.redirectBlock }}>
          <Typography classes={{ root: classes.titleChangePage }}>Don't have an account?</Typography>
          <Button onClick={() => history.push('/register')} classes={{ root: classes.redirectButton}}>Create account</Button>
        </Grid>
        <Grid item lg={6}>
          <Typography classes={{ root: classes.formTitle }}>Welcome back!</Typography>
          <form onSubmit={handleLogin} className='form login-form'>
            <FormControl margin='normal' required fullWidth classes={{ root: classes.formControl}}>
              <TextField
                  aria-label='email address'
                  label='E-mail address'
                  name='username'
                  type='text'
                  fullWidth
                  size='medium'
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth classes={{ root: classes.formControl}}>
              <TextField
                  label='password'
                  aria-label='password'
                  type='password'
                  name='password'
                  fullWidth
                  size='medium'
              />
            </FormControl>
            <Button type='submit' variant='contained' classes={{ root: classes.submitButton}}>
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
