import React from "react";
import AliceCarousel from "react-alice-carousel";
import HeroItem from "../heroItem/HeroItem";

function Hero({ movies }) {
  const items = movies.map((movie) => {
    return <HeroItem movie={movie} />;
  });
  return (
    <div className="hero">
      <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        items={items}
        autoPlay
        autoPlayInterval={5000}
      />
    </div>
  );
}

export default Hero;
