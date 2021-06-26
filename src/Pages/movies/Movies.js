import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "../../Components/cardItem/CardMovie";
import Loading from "../../Components/loadingPage/Loading";
import CustomPagination from "../../Components/pagination/CustomPagination";
import Error from "../../Components/error/Error";
// import "./movies.css";

function Movies() {
  require("dotenv").config();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const fetchTrending = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}`
      );
      setMovies(data.results);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div className="movies">
      {!error ? (
        <div className="page-title">
          <h2>MOVIES 📽️</h2>
        </div>
      ) : null}
      {!isLoading ? (
        !error ? (
          <div className="pagination--top">
            <CustomPagination setPage={setPage} page={page} />
          </div>
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
                  release={movie.release_date}
                  type={movie.media_type || "Movies"}
                  vote={movie.vote_average ? movie.vote_average : 6}
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
          <div className="pagination--bottom">
            <CustomPagination setPage={setPage} page={page} />
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export default Movies;
