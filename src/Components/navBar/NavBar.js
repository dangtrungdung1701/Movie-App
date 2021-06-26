import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";
import "./navbar.css";
import { useHistory } from "react-router-dom";

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
  const classes = useStyles();
  const [value, setValue] = React.useState("trends");

  const history = useHistory();
  useEffect(() => {
    switch (value) {
      case "trends":
        history.push("/");
        break;
      case "movies":
        history.push("/movies");
        break;
      case "series":
        history.push("/series");
        break;
      case "search":
        history.push("/search");
        break;
      default:
    }
  }, [value, history]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        className="nav__icon"
        label="Trending"
        value="trends"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        className="nav__icon"
        label="Movies"
        value="movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        className="nav__icon"
        label="TV Series"
        value="series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        className="nav__icon"
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
