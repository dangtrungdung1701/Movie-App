import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "../../Components/cardItem/CardMovie";
import Loading from "../../Components/loadingPage/Loading";
import CustomPagination from "../../Components/pagination/CustomPagination";
import Error from "../../Components/error/Error";
import Store from "../../Storage/Storage";
import Genres from "../../Components/genres/genres";
import useGenre from "../../hook/useGenres";

function Movies() {
  require("dotenv").config();

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
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genreforURL]);

  return (
    <div className="movies">
      {!error ? (
        <div className="page-title">
          <h2>MOVIES 📽️</h2>
        </div>
      ) : null}
      {!isLoading ? (
        !error ? (
          <Genres
            type="movie"
            setGenres={setGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            selectedGenres={selectedGenres}
            setPage={setPage}
          />
        ) : null
      ) : null}
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
          !error ? (
            movies.map((movie) => {
              return (
                <CardMovie
                  key={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  release={movie.release_date || "Update Later"}
                  type="movie"
                  vote={movie.vote_average ? movie.vote_average : 6}
                  id={movie.id}
                />
              );
            })
          ) : (
            <Error />
          )
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
  );
}

export default Movies;
