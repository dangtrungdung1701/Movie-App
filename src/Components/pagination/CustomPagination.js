import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./customPagination.css";

function CustomPagination({ setPage, numOfPages = 10 }) {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const handleChangePage = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div className="pagination">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handleChangePage(e.target.textContent)}
          count={numOfPages}
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
