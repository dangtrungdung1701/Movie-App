import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./customPagination.css";
import { PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
function CustomPagination({ setPage, numOfPages, page, url }) {
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
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${url}/page=${item.page}`}
              {...item}
            />
          )}
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPagination;
