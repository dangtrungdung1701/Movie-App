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

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} exact />
            <Route path="/series" component={Series} exact />
            <Route path="/search" component={Search} exact />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
