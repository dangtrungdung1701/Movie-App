import React from "react";
import { img_300, unavailable } from "../../config/Config";
import "./cartItem.css";

function CardMovie({ poster, title, release, type }) {
  return (
    <div className="card">
      <img
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
        className="card__image"
      />
      <b className="card__title">{title}</b>
      <div className="card__subtitle">
        <span>{type === "tv" ? "TV Series" : type}</span>
        <span>{release}</span>
      </div>
    </div>
  );
}

export default CardMovie;
