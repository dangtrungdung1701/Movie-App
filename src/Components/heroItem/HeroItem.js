import axios from "axios";
import React, { useEffect, useState } from "react";
import RoundButton from "../buttonControl/ButtonControl";

function HeroItem({ movie }) {
  const [credits, setCredits] = useState([]);
  const [genres, setGenres] = useState([]);
  const fetchCredits = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}/credits?api_key=${api_key}`
    );
    setCredits(data.cast.filter((item) => item.popularity > 10));
  };
  const fetchMovieInfor = async () => {
    const api_key = process.env.REACT_APP_API_KEY;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}?api_key=${api_key}`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchCredits();
    fetchMovieInfor();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="HeroItem">
      <RoundButton type="left" />
      <div className="hero__main">
        <div className="content">
          <h1 className="title">{movie.title || movie.name}</h1>
          <div className="review-language">
            <span className="review">
              {movie.vote_average ? movie.vote_average : 6}
            </span>
            <span className="language">{movie.original_language}</span>
          </div>
          <p className="desc">
            {movie.overview ||
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel autem quae veniam corporis, aliquid a molestias eos pariatur ab voluptate sit nemo repudiandae error? Magni, obcaecati. Eligendi excepturi iure beatae."}
          </p>
          <div className="starring">
            <span>Starring</span>
            {credits.map((item, index) => {
              let lenght = credits.length - 1;
              if (index === lenght) {
                return <span title={item?.name}>{item?.name}.</span>;
              }
              return <span title={item?.name}>{item?.name},</span>;
            })}
          </div>
          <div className="genres">
            <span>Genres</span>
            {genres[0]?.name}
          </div>
          <div className="tag">
            <span>Tag</span>
            {genres.map((item, index) => {
              let lenght = genres.length - 1;
              if (index === lenght) {
                return <span title={item?.name}>{item?.name}.</span>;
              }
              return <span title={item?.name}>{item?.name},</span>;
            })}
          </div>
        </div>
        <div className="btn-play">
          <RoundButton type="play" />
          <span>watch trailer</span>
        </div>
      </div>
      <RoundButton type="right" />
    </div>
  );
}

export default HeroItem;
