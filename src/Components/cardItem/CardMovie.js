import React from "react";
import { img_300, unavailable } from "../../config/Config";
import Badge from "@material-ui/core/Badge";
import ContentModal from "../../Components/contentModal/ContentModal";
import "./cartItem.css";

function CardMovie({ poster, title, release, type, vote, id }) {
  return (
    <ContentModal media_type={type} id={id}>
      <Badge badgeContent={vote} color={vote >= 6 ? "primary" : "secondary"} />
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
    </ContentModal>
  );
}

export default CardMovie;
