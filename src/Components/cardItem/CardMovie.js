import React from "react";
import { img_300, unavailable } from "../../config/Config";
import "./cartItem.css";
import Badge from "@material-ui/core/Badge";

function CardMovie({ poster, title, release, type, vote }) {
  return (
    <div className="card">
      <Badge
        badgeContent={vote}
        color={vote >= 6 ? "primary" : "secondary"}
      ></Badge>
      <img
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
        className="card__image"
      />
      <b title={title} className="card__title">
        {title}
      </b>
      <div className="card__subtitle">
        <span>{type === "tv" ? "TV Series" : type}</span>
        <span>{release}</span>
      </div>
    </div>
  );
}

export default CardMovie;
