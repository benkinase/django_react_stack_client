import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../redux/actions/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    letterSpacing: 3,
  },
  footer: {
    display: "flex",
    backgroundColor: "#e2e6df",
    padding: 10,
  },
}));

function LoginForm() {
  const { loading, error, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const initialState = { username: "", password: "" };
  const [state, setState] = React.useState(initialState);

  function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = state;
    if (!username || !password) return false;

    const oldUser = { username, password };
    dispatch(login(oldUser));
    setState(initialState);
  }

  function handleChange(e) {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setState({ ...state, [name]: value });
  }

  // //umleiten wenn schon authentifiziert
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
            Sign in
          </Typography>
        </div>
        {error && <p>{error}</p>}
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={handleChange}
            value={state.username}
            name='username'
            label='Username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={handleChange}
            value={state.password}
            name='password'
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading" : "Login"}
          </Button>
          <Grid container className={classes.footer}>
            <Grid item xs>
              <Link href='/signup' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                <span>Don't have an account?</span> Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
