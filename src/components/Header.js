import React from "react";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FineDrawer } from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1117,
    margin: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "transparent",
    boxShadow: "none",
    color: "green",
  },
}));

export default function ButtonAppBar() {
  const { token } = useSelector((state) => state.auth);
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.header}>
        <Toolbar>
          <FineDrawer />
          <Typography variant='h6' className={classes.title}>
            Book review
          </Typography>
          {token ? (
            <>
              <Button color='inherit' onClick={() => history.push("/")}>
                Dashboard
              </Button>
            </>
          ) : (
            <React.Fragment>
              <Button color='inherit' onClick={() => history.push("/login")}>
                Login
              </Button>
              <Button color='inherit' onClick={() => history.push("/register")}>
                Register
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
