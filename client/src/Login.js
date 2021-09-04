import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login } from './store/utils/thunkCreators';

import './index.css';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '100vh',
  },
  submitButton: {
      width: '160px',
      height: '66px',
      backgroundColor: '#3A8DFF',
      borderRadius: '3px',
      color: '#FFFFFF',
      fontSize: '16px',
      '&:hover': {
        opacity: '0.8',
        backgroundColor: '#3A8DFF',
      }
  },
  redirectButton: {
    width: '160px',
    height: '66px',
    backgroundColor: '#FFFFFF',
    color: '#3A8DFF',
    fontSize: '14px',
    boxShadow: '0 2px 12px 0 rgba(74,106,149,0.20)',
    borderRadius: '5px',
  },
  formControl: {
    height: '66px',
    '& .MuiInputLabel-shrink': {
      transform:' translate(0, -15px) scale(0.75)',
    },
    '& .MuiInputBase-input': {
      padding: '10px 0',

      '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px white inset',
      }
    },
  },
}));

const Login = (props) => {
  const classes = useStyles()
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
        <div className='logo' />
      </Grid>

      <Grid item lg={7} md={12} sm={12} container justifyContent='center' alignItems='center' className='form-block'>
        <Grid lg={7} md={12} sm={12} container className='redirect-block'>
          <Typography className='title-change-page'>Don't have an account?</Typography>
          <Button onClick={() => history.push('/register')} classes={{ root: classes.redirectButton}}>Create account</Button>
        </Grid>
        <Grid item lg={6}>
          <div className='form-title'>Welcome back!</div>
          <form onSubmit={handleLogin} className='form'>
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
