import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText, Box,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { useStyles } from './styles';

import './index.css';

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container classes={{ root: classes.mainContainer}}>
      <Grid item lg={5} md={12} sm={0} justifyContent='flex-start'>
        <Box className='logo' />
      </Grid>

      <Grid item lg={7} md={12} sm={12} container justifyContent='center' alignItems='center' classes={{ root: classes.loginSignupContainer }}>
        <Grid lg={7} md={12} sm={12} container classes={{ root: classes.redirectBlock }}>
          <Typography classes={{ root: classes.titleChangePage }}>Already have an account?</Typography>
          <Button onClick={() => history.push('/login')} classes={{ root: classes.redirectButton}}>Login</Button>
        </Grid>
        <Grid item lg={6}>
          <Typography classes={{ root: classes.formTitle }}>Create an account.</Typography>
          <form onSubmit={handleRegister} className='form signup-form'>
              <FormControl margin='normal' required fullWidth classes={{ root: classes.formControl}}>
                <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                />
              </FormControl>
              <FormControl margin='normal' required fullWidth classes={{ root: classes.formControl}}>
                <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                />
              </FormControl>
              <FormControl margin='normal' required fullWidth classes={{ root: classes.formControl}} error={!!formErrorMessage.confirmPassword}>
                <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <FormControl margin='normal' required fullWidth classes={{ root: classes.formControl}} error={!!formErrorMessage.confirmPassword}>
                <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <Button type='submit' variant='contained' classes={{ root: classes.submitButton}}>
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
