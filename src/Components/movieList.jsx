import React, { useEffect, useState } from "react";
// import "./styles.css";
import { useParams } from "react-router-dom";
import Cards from "./card";
import Footer from "./footer";

const MovieList = ({ type }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const { term } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [type, term]);

  useEffect(() => {
    getData();
  }, [term, type, currentPage]);

  const getData = async () => {
    if (term) {
      try {
        const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`;
        const tvShowsUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${term}`;

        const [moviesResponse, tvShowsResponse] = await Promise.all([
          fetch(moviesUrl),
          fetch(tvShowsUrl),
        ]);

        const [moviesData, tvShowsData] = await Promise.all([
          moviesResponse.json(),
          tvShowsResponse.json(),
        ]);

        const combinedResults = [...moviesData.results, ...tvShowsData.results];
        setMovieList(combinedResults);
      } catch {
        (error) => console.error("Error fetching data:", error);
      }
    } else {
      let url = `https://api.themoviedb.org/3/${
        type === "tv" ? "tv/top_rated" : "movie/popular"
      }?api_key=${apiKey}&language=en-US&page=${currentPage}`;
      try {
        let response = await fetch(url);
        let data = await response.json();
        setMovieList([...data.results]);
      } catch {
        (error) => console.error("Error fetching data:", error);
      }
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="movie__list bg-gray-900 pb-4 px-12 min-h-screen flex flex-col flex-grow">
      <h2 className="list__title mt-0 pt-20 ml-0 text-3xl m-10">
        {term
          ? `Results for "${
              term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()
            }"`
          : type === "tv"
          ? "TV Shows"
          : "Movies"}
      </h2>
      <div className="list__cards flex flex-wrap justify-center">
        {movieList.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
      <div
        className={`pagination mt-5 flex justify-between ${
          term ? "hidden" : ""
        }`}
      >
        <button
          className="relative justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex items-center border-none cursor-pointer rounded-md"
          onClick={handlePrevPage}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <i className="fa-solid fa-chevron-left mr-1 text-xs"></i>
            <span className="max-sm:hidden">Previous Page</span>
          </span>
        </button>

        <button
          className="relative justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex items-center border-none cursor-pointer rounded-md"
          onClick={handleNextPage}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <span className="max-sm:hidden">Next Page</span>
            <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
          </span>
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MovieList;
