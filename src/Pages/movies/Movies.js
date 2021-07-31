import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "../../Components/cardItem/CardMovie";
import Loading from "../../Components/loadingPage/Loading";
import CustomPagination from "../../Components/pagination/CustomPagination";
import Error from "../../Components/error/Error";
import Store from "../../Storage/Storage";
import Genres from "../../Components/genres/genres";
import useGenre from "../../hook/useGenres";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import BodyContent from "../../Components/bodyContent/BodyContent";

function Movies() {
  require("dotenv").config();
  const { path, url } = useRouteMatch();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(Store.get());
  const [error, setError] = useState(false);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const genreforURL = useGenre(selectedGenres);

  const fetchTrending = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}&with_genres=${genreforURL}`
      );
      setMovies(data.results);
      setNumberOfPage(data.total_pages);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    setIsLoading(true);
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genreforURL]);

  return (
    <div>
      <Redirect to={`${path}/page=${page}`} />
      <Route path={`${path}/:currentPage`}>
        <BodyContent
          isLoading={isLoading}
          error={error}
          Movies={movies}
          setPage={setPage}
          page={page}
          numberOfPage={numberOfPage}
          url={url}
          setGenres={setGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          selectedGenres={selectedGenres}
        />
      </Route>
    </div>
  );
}

export default Movies;
