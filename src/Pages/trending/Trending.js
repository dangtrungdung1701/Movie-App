import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "../../Components/cardItem/CardMovie";
import Loading from "../../Components/loadingPage/Loading";
import CustomPagination from "../../Components/pagination/CustomPagination";
import "./trending.css";
import Error from "../../Components/error/Error";
import Store from "../../Storage/Storage";
function Trending() {
  require("dotenv").config();

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(Store.get());
  const [error, setError] = useState(false);
  const [numberOfPage, setNumberOfPage] = useState(0);

  const fetchTrending = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`
      );
      setTrendingMovies(data.results);
      setNumberOfPage(data.total_pages);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="trending">
      {!error ? (
        <div className="page-title">
          <h2>TRENDING TODAY 🔥</h2>
        </div>
      ) : null}
      {!isLoading ? (
        !error ? (
          <div className="pagination--top">
            <CustomPagination
              setPage={setPage}
              page={page}
              numOfPages={numberOfPage}
            />
          </div>
        ) : null
      ) : null}
      <div className="body">
        {!isLoading ? (
          !error ? (
            trendingMovies.map((trendingMovie) => {
              return (
                <CardMovie
                  key={trendingMovie.id}
                  poster={trendingMovie.poster_path}
                  title={trendingMovie.title || trendingMovie.name}
                  release={
                    trendingMovie.release_date ||
                    trendingMovie.first_air_date ||
                    "Update Later"
                  }
                  type={trendingMovie.media_type}
                  vote={
                    trendingMovie.vote_average ? trendingMovie.vote_average : 6
                  }
                  id={trendingMovie.id}
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
            <CustomPagination
              setPage={setPage}
              page={page}
              numOfPages={numberOfPage}
            />
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export default Trending;
