import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";
import Store from "../../Storage/Storage";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    background: "#0c2738",
    zIndex: 99,
  },
});

export default function NavBar() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(history.location.pathname.slice(1));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={!value ? "trends" : value}
      onChange={handleChange}
      className={classes.root}
    >
      <Link to="/trending/page=1">
        <BottomNavigationAction
          className="nav__icon"
          label="Trending"
          value="trends"
          icon={<WhatshotIcon />}
        />
      </Link>
      <Link to="/movies/page=1">
        <BottomNavigationAction
          className="nav__icon"
          label="Movies"
          value="movies"
          icon={<MovieIcon />}
        />
      </Link>
      <Link to="/series/page=1">
        <BottomNavigationAction
          className="nav__icon"
          label="TV Series"
          value="series"
          icon={<TvIcon />}
        />
      </Link>
      <Link to="/search">
        <BottomNavigationAction
          className="nav__icon"
          label="Search"
          value="search"
          icon={<SearchIcon />}
        />
      </Link>
    </BottomNavigation>
  );
}
