import React from "react";
import ReactLoading from "react-loading";
import "./loading.css";

function Loading() {
  return (
    <div className="loading">
      <ReactLoading type="cylon" color="#fff" className="loading__icon" />
    </div>
  );
}

export default Loading;
