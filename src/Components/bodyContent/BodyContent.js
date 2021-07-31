import React from "react";
import CardMovie from "../cardItem/CardMovie";
import Error from "../error/Error";
import Loading from "../loadingPage/Loading";
import CustomPagination from "../pagination/CustomPagination";
import Genres from "../../Components/genres/genres";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function BodyContent({
  isLoading,
  error,
  Movies,
  setPage,
  page,
  numberOfPage,
  url,
  setGenres,
  setSelectedGenres,
  genres,
  selectedGenres,
}) {
  const { currentPage } = useParams();
  const currPage = parseInt(currentPage.slice(5)) || 1;
  useEffect(() => {
    setPage(parseInt(currentPage.slice(5)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="trending">
      {!isLoading ? (
        !error ? (
          currPage <= numberOfPage ? (
            <>
              {!error ? (
                <div className="page-title">
                  <h2>
                    {url === "/trending"
                      ? "TRENDING TODAY 🔥"
                      : url === "/series"
                      ? "TV SERIES 📺"
                      : "MOVIES 📽️"}
                  </h2>
                </div>
              ) : null}
              {genres ? (
                !isLoading ? (
                  !error ? (
                    <Genres
                      type={url === "/series" ? "tv" : "movie"}
                      setGenres={setGenres}
                      setSelectedGenres={setSelectedGenres}
                      genres={genres}
                      selectedGenres={selectedGenres}
                      setPage={setPage}
                    />
                  ) : null
                ) : null
              ) : null}
              {!isLoading ? (
                !error ? (
                  <div className="pagination--top">
                    <CustomPagination
                      setPage={setPage}
                      page={page}
                      numOfPages={numberOfPage}
                      url={url}
                    />
                  </div>
                ) : null
              ) : null}
              <div className="body">
                {!isLoading ? (
                  !error ? (
                    Movies.map((Movie) => {
                      return (
                        <CardMovie
                          key={Movie.id}
                          poster={Movie.poster_path}
                          title={Movie.title || Movie.name}
                          release={
                            Movie.release_date ||
                            Movie.first_air_date ||
                            "Update Later"
                          }
                          type={Movie.media_type}
                          vote={Movie.vote_average ? Movie.vote_average : 6}
                          id={Movie.id}
                        />
                      );
                    })
                  ) : (
                    <Error />
                  )
                ) : (
                  <Loading />
                )}
              </div>

              {!isLoading ? (
                !error ? (
                  <div className="pagination--bottom">
                    <CustomPagination
                      setPage={setPage}
                      page={page}
                      numOfPages={numberOfPage}
                      url={url}
                    />
                  </div>
                ) : null
              ) : null}
            </>
          ) : (
            <Error />
          )
        ) : (
          <Error />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default BodyContent;
