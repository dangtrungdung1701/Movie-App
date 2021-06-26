import React from "react";
import "./header.css";
function Header() {
  const handleScrollToTop = () => {
    window.scroll(0, 0);
  };
  return (
    <div className="header">
      <span className="header__title" onClick={handleScrollToTop}>
        Netflax
      </span>
    </div>
  );
}

export default Header;
