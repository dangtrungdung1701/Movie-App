import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./customPagination.css";

function CustomPagination({ setPage, numOfPages, page }) {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const handleChangePage = (e, page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div className="pagination">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          page={page}
          onChange={(e, page) => handleChangePage(e, page)}
          count={numOfPages}
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
