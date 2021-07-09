import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../Components/pagination/CustomPagination";
import CardMovie from "../../Components/cardItem/CardMovie";
import Error from "../../Components/error/Error";
import Loading from "../../Components/loadingPage/Loading";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numberOfPage, setNumberOfPage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=${api_key}&query=${searchText}&page=${page}`
      );
      setContent(data.results);
      setNumberOfPage(data.total_pages);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = () => {
    setIsLoading(true);
    fetchSearch();
    setPage(1);
  };
  useEffect(() => {
    window.scroll(0, 0);
    if (searchText) {
      setIsLoading(true);
      fetchSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={() => handleSearch()}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="search--movie">
        {!isLoading ? (
          !error ? (
            numberOfPage > 1 ? (
              <div className="pagination--bottom">
                <CustomPagination
                  setPage={setPage}
                  page={page}
                  numOfPages={numberOfPage}
                />
              </div>
            ) : null
          ) : null
        ) : null}
        <div className="body">
          {!isLoading ? (
            !(content.length === 0) ? (
              content.map((movie) => {
                return (
                  <CardMovie
                    key={movie.id}
                    poster={movie.poster_path}
                    title={movie.name || movie.title}
                    release={
                      movie.first_air_date ||
                      movie.release_date ||
                      "Update later"
                    }
                    type={type ? "tv" : "movie"}
                    vote={movie.vote_average ? movie.vote_average : 6}
                    id={movie.id}
                  />
                );
              })
            ) : (
              <Error />
            )
          ) : !searchText ? (
            <h1 style={{ width: "100%", textAlign: "center" }}>
              Please enter the movie!!!
            </h1>
          ) : (
            <Loading />
          )}
        </div>
        {!isLoading ? (
          !error ? (
            numberOfPage > 1 ? (
              <div className="pagination--bottom">
                <CustomPagination
                  setPage={setPage}
                  page={page}
                  numOfPages={numberOfPage}
                />
              </div>
            ) : null
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default Search;
