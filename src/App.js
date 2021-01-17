import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "pages/Home";
import MyTeam from "pages/MyTeam";
import Detail from "pages/Detail";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ls from "local-storage";

if (!ls("dogs")) {
  ls("dogs", []);
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: theme.palette.common.white,
  },
  body: {
    margin: 15,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Link to="/" data-test="home">
              <Typography variant="h6" className={classes.title}>
                Home
              </Typography>
            </Link>
            <Link to="/my-team" data-test="my-team">
              <Typography variant="h6" className={classes.title}>
                My Team
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <Switch>
            <Route path="/detail/:dog">
              <Detail />
            </Route>
            <Route path="/my-team">
              <MyTeam />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
