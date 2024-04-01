/* eslint-disable no-unreachable */
//start page (home page)
import { useState, useEffect } from "react";
import { Hover } from "../components/Hover";
// const API_KEY = "f34e76ca0c4c61e8906dd3e22b0fe2af";
// const API_LANG = "en-US";

export const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const API_KEY = "f34e76ca0c4c61e8906dd3e22b0fe2af";
  const API_LANG = "en-US";

  // const movies = data;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${API_LANG}page=1`
        );
        if (!response.ok) {
          throw new Error("Couldn't fetch data!");
        }
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <p> loading...</p>
      ) : (
        <div>
          {movies.map((movie) => {
            return (
              <Hover
                key={movie.id}
                title={movie.title}
                date={movie.release_date}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};