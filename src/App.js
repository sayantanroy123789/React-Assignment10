import React, { useEffect, useState } from "react";
import Movielist from "./components/Movielist";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

  const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  const getAllMovies = async () => {
    try {
      const response = await axios.get(APIURL);

      console.log(response.data.results);

      setMovies(response.data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSearchedMovies = async () => {
    try {
      const response = await axios.get(SEARCHAPI + search);
      setMovies(response.data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (search === "") {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
  }, [search]);

  return (
    <>
      <div className="container">
        <h1 className="text-center my-3">Movie Search App</h1>

        <input
          type="search"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Movielist movies={movies} />
      </div>
    </>
  );
};

export default App;