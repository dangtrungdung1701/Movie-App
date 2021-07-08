import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "../../Components/cardItem/CardMovie";
import Loading from "../../Components/loadingPage/Loading";
import CustomPagination from "../../Components/pagination/CustomPagination";
import Error from "../../Components/error/Error";
import Store from "../../Storage/Storage";
import Genres from "../../Components/genres/genres";
import useGenre from "../../hook/useGenres";

function Series() {
  require("dotenv").config();

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(Store.get());
  const [error, setError] = useState(false);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const genreforURL = useGenre(selectedGenres);

  const fetchTrending = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&page=${page}&with_genres=${genreforURL}`
      );
      setSeries(data.results);
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
    <div className="series">
      {!error ? (
        <div className="page-title">
          <h2>TV SERIES 📺 </h2>
        </div>
      ) : null}
      {!isLoading ? (
        !error ? (
          <Genres
            type="tv"
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
            series.map((serie) => {
              return (
                <CardMovie
                  key={serie.id}
                  poster={serie.poster_path}
                  title={serie.name}
                  release={serie.first_air_date || "Update Later"}
                  type="tv"
                  vote={serie.vote_average ? serie.vote_average : 6}
                  id={serie.id}
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

export default Series;
