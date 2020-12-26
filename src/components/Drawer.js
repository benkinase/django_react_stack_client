import React from "react";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
    marginTop: 50,
  },
  fullList: {
    width: "auto",
  },
  links: {
    textDecoration: "none",
    fontSize: 17,
    marginLeft: 35,
    letterSpacing: 1,
    color: "green",
  },
  menuButton: {
    marginRight: 5,
  },

  logout: { marginLeft: 60, marginBottom: 20 },
});

export const FineDrawer = () => {
  const { user } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/login");
  };

  const toggleDrawer = (anchor, open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  let links = { Login: "/login", Register: "/register" };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Object.keys(links).map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <EditLocationIcon />}
              <Link
                className={classes.links}
                to={text === "Signup" ? "/register" : "/login"}
              >
                {text}
              </Link>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {user && (
        <Button onClick={() => handleLogout()} className={classes.logout}>
          Logout
        </Button>
      )}
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            onClick={toggleDrawer(anchor, true)}
            color='inherit'
            aria-label='menu'
          >
            {<MenuIcon />}
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
