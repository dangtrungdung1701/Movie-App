import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "../../Components/cardItem/CardMovie";
import Loading from "../../Components/loadingPage/Loading";
import CustomPagination from "../../Components/pagination/CustomPagination";
import "./trending.css";
import Error from "../../Components/error/Error";
import Store from "../../Storage/Storage";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import BodyContent from "../../Components/bodyContent/BodyContent";
function Trending() {
  require("dotenv").config();
  const { path, url } = useRouteMatch();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
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
    setIsLoading(true);
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    return () => {
      window.addEventListener("unload", (e) => {
        e.preventDefault();
        Store.set(1);
        return "Are you sure you want to close?";
      });
    };
  });

  return (
    <div>
      {path === "/treding"
        ? () => {
            console.log(path);
            return <Redirect from={path} to={`${path}/page=${page}`} />;
          }
        : null}
      <Route path={`${path}/:currentPage`}>
        <BodyContent
          isLoading={isLoading}
          error={error}
          Movies={trendingMovies}
          setPage={setPage}
          page={page}
          numberOfPage={numberOfPage}
          url={url}
        />
      </Route>
    </div>
  );
}

export default Trending;
