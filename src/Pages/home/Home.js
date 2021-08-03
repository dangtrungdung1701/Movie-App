import axios from "axios";
import React, { useEffect, useState } from "react";
import Hero from "../../Components/hero/Hero";
import Loading from "../../Components/loadingPage/Loading";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  const [error, setError] = useState(false);
  const [numberOfPage, setNumberOfPage] = useState(0);

  const fetchTrending = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
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
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="home">
      <Hero movies={trendingMovies} />
    </div>
  );
}

export default Home;
