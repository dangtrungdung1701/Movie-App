import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "../../Components/cardItem/CardMovie";
import Loading from "../../Components/loadingPage/Loading";
import CustomPagination from "../../Components/pagination/CustomPagination";
import Error from "../../Components/error/Error";
import Store from "../../Storage/Storage";

function Series() {
  require("dotenv").config();

  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(Store.get());
  const [error, setError] = useState(false);
  const [numberOfPage, setNumberOfPage] = useState(0);

  const fetchTrending = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&page=${page}`
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
    fetchTrending();
  }, [page]);

  return (
    <div className="series">
      {!error ? (
        <div className="page-title">
          <h2>TV SERIES 📺 </h2>
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
            series.map((serie) => {
              return (
                <CardMovie
                  key={serie.id}
                  poster={serie.poster_path}
                  title={serie.name}
                  release={serie.first_air_date || "Update Later"}
                  type={"TV Series"}
                  vote={serie.vote_average ? serie.vote_average : 6}
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

export default Series;
