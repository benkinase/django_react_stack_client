import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";

import { register } from "../redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  option: { padding: 5 },
  submit: {
    margin: theme.spacing(3, 0, 2),
    letterSpacing: 3,
  },
  selectEmpty: {
    marginTop: theme.spacing(0.2),
    marginLeft: 200,
  },
  footer: { display: "flex", backgroundColor: "#e2e6df", padding: 10 },
}));

function RegistrationForm() {
  const { error, loading, user } = useSelector((state) => state.auth);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const [state, setState] = React.useState(initialState);

  function handleSubmit(e) {
    e.preventDefault();
    const { username, email, password, cpassword } = state;
    if (password !== cpassword) return;

    const newUser = {
      username,
      email,
      password,
    };
    dispatch(register(newUser));
    setState(initialState);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  // // umleiten wenn schon authentifiziert
  React.useEffect(() => {
    user && history.push("/");
    return () => {};
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.flex}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
        </div>
        {error && <p>{error.message}</p>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Username'
                autoComplete='lname'
                onChange={handleChange}
                value={state.username || ""}
                name='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
                value={state.email || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Password'
                type='password'
                autoComplete='current-password'
                onChange={handleChange}
                fluid='true'
                value={state.password || ""}
                name='password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Confirm Password'
                type='password'
                autoComplete='current-password'
                onChange={handleChange}
                fluid='true'
                value={state.cpassword || ""}
                name='cpassword'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <Grid container className={classes.footer}>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegistrationForm;
