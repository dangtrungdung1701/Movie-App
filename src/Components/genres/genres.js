import axios from "axios";
import React, { useEffect } from "react";
import { Chip } from "@material-ui/core";

function Genges({
  type,
  setGenres,
  genres,
  setSelectedGenres,
  selectedGenres,
  setPage,
}) {
  require("dotenv").config();

  const fetchTrending = async () => {
    const api_key = process.env.REACT_APP_API_KEY;

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}`
      );
      setGenres(data.genres);
    } catch (err) {
    } finally {
    }
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    fetchTrending();
    return () => {
      setGenres({});
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
}

export default Genges;
