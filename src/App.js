import React from "react";
import Header from "./Components/header/Header";
import NavBar from "./Components/navBar/NavBar";
import { Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./Pages/trending/Trending";
import Movies from "./Pages/movies/Movies";
import Series from "./Pages/series/Series";
import Search from "./Pages/search/Search";
import ErrorPage from "./Pages/error/ErrorPage";
import { createBrowserHistory } from "history";

import "./App.css";
import Home from "./Pages/Home/Home";

function App() {
  const history = createBrowserHistory();

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Container>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/trending" component={Trending} />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
