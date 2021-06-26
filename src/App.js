import "./App.css";
import Header from "./Components/header/Header";
import NavBar from "./Components/navBar/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./Pages/trending/Trending";
import Movies from "./Pages/movies/Movies";
import Series from "./Pages/series/Series";
import Search from "./Pages/search/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
        <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
