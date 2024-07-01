import React, { useEffect, useState } from "react";
// import "./styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch movie details
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              append_to_response: "videos",
            },
          }
        );

        setMovie(data);

        if (data.videos && data.videos.results.length > 0) {
          const officialTrailer = data.videos.results.find(
            (vid) => vid.name === "Official Trailer"
          );
          setTrailer(officialTrailer || data.videos.results[0]);
        }
      } catch (error) {
        setError("Error fetching movie details. Please try again later.");
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCast = async () => {
      try {
        // Fetch cast details
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "en-US",
            },
          }
        );

        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchMovieData();
    fetchCast();
  }, [id]);

  // Function to handle modal opening
  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle modal closing
  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (    
    <div className="loading fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
    <div >
        <button disabled type="button" className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading&hellip;
        </button>
    </div>
  </div>
  );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie w-full bg-black relative flex flex-col items-center">
      <div className="movie__intro w-4/5 max-sm:w-11/12">
        <img
          className="movie__backdrop w-full h-fit object-cover rounded-xl shadow-lg "
          style = {{objectPosition:'0 35%'}}
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path}`}
          alt={currentMovieDetail?.title || "Movie backdrop"}
        />
      </div>
      <div className="movie__detail max-xs:w-full max-xs:bottom-[60px] max-bs:w-[95%] max-bs:bottom-[120px] flex items-center relative w-3/4 bottom-[225px] lg:bottom-44 md:max-lg:flex-col md:max-lg:items-center max-md:w-[90%] max-md:bottom-[150px]">
        <div className="movie__detailLeft mr-7">
          <div
            className={`movie__posterBox w-80 max-sm:w-28 max-sm:top-5 max-sm:relative max-bs:w-44 max-lg:w-64 max-md:w-52${
              showModal ? "active-poster relative bottom-60 max-lg:top-0 max-bs:bottom-0" : ""
            }`}
          >
            <img
              className="movie__poster rounded-xl shadow-2xl relative bottom-12 max-bs:bottom-0 max-xs:bottom-6"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path}`}
              alt={currentMovieDetail?.title || "Movie poster"}
            />
          </div>
        </div>
        <div className="movie__detailRight max-xs:w-[98%] text-white flex flex-col h-auto content-between">
          <div className="movie__detailRightTop">
            <div className="movie__name max-sm:text-2xl max-xs:text-xl max-bs:text-3xl text-5xl font-semibold drop-shadow-md md:max-lg:text-4xl max-md:text-4xl">
              {currentMovieDetail?.original_title || "N/A"}
            </div>
            <div className="movie__tagline italic drop-shadow-md max-xs:text-base">
              {currentMovieDetail?.tagline || "No tagline available"}
            </div>
            <div className="movie__rating drop-shadow-md max-xs:text-sm">
              {currentMovieDetail?.vote_average ? (
                <>
                  {currentMovieDetail.vote_average.toFixed(2)}{" "}
                  <i className="fas fa-star hover:text-yellow-400" />
                  <span className="movie__voteCount max-bs:text-xs ml-4 text-xl text-gray-400 md:max-lg:text-base max-md:text-sm">
                    ({currentMovieDetail.vote_count} votes)
                  </span>
                </>
              ) : (
                "No rating available"
              )}
            </div>
            <div className="movie__runtime drop-shadow-md max-xs:text-sm">
              {currentMovieDetail?.runtime
                ? `${currentMovieDetail.runtime} mins`
                : "No runtime available"}
            </div>
            <div className="movie__releaseDate drop-shadow-md max-xs:text-sm">
              Release date: {currentMovieDetail?.release_date || "N/A"}
            </div>
            <div className="movie__genres  max-xs:hidden my-5 drop-shadow-md">
              {currentMovieDetail?.genres?.length > 0 ? (
                currentMovieDetail.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="movie__genre max-md:text-xs md:max-lg:text-base p-2 rounded-3xl mr-4 text-base cursor-pointer text-white transition-colors duration-200 ease-in-out border-2 border-solid border-white hover:bg-[#f39c12]"
                  >
                    {genre.name}
                  </span>
                ))
              ) : (
                <span>No genres available</span>
              )}
            </div>
            <div className="movie__detailRightBottom my-8 drop-shadow-md">
              <div className="synopsisText  max-bs:text-base text-2xl mb-5 font-semibold drop-shadow-md md:max-lg:text-xl max-md:text-base">
                Synopsis
              </div>
              <div className="ml-auto max-xs:text-sm">
                {currentMovieDetail?.overview || "No synopsis available"}
              </div>
            </div>
            <button
              className="watch-trailer-btn max-xs:hidden max-sm:text-sm m-2 mb-4 w-auto h-auto py-3 px-6 text-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 border-none rounded-md cursor-pointer font-serif"
              onClick={openModal}
            >
              Watch Trailer
            </button>
            {showModal && trailer && (
              <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
                <div className="modal-content relative w-full max-w-screen-md max-lg:max-w-screen-sm max-md:max-w-[580px] max-bs:max-w-[420px] max-sm:max-w-[290px] max-xs:max-w-[240px]">
                  <div className="relative overflow-hidden w-full h-full max-w-full pb-[60%]">
                    <YouTube
                      videoId={trailer.key}
                      className="youtube absolute top-0 left-0 w-full h-full border-none"
                      containerClassName="youtube-container"
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 0,
                          controls: 1,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 3,
                          modestbranding: 1,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                  </div>
                  <button
                    className="close-modal-btn max-sm:text-sm m-2 w-auto h-auto py-2 px-6 text-base text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 border-none rounded-md cursor-pointer font-serif"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`movie-cast max-md:bottom-[150px] max-bs:bottom-[120px] max-xs:bottom-[60px] flex justify-center items-center flex-col mt-8 relative bottom-52${
          showModal ? "active" : "inactive relative"
        }`}
      >
        <h1 className="max-bs:text-base text-2xl mb-5 font-semibold drop-shadow-md md:max-lg:text-xl max-md:text-base " >Cast & Crew</h1>
        <br />
        <div className="movie__cast max-md:w-11/12 max-bs:w-[98%] w-3/4 flex flex-wrap gap-4 content-center items-center">
          {cast && cast.map((member) => (
            member.profile_path && (
            <div
              key={member.cast_id}
              className="cast-member max-md:w-[150px] max-bs:[130px] flex flex-col items-center text-center min-w-44 max-w-44 h-auto "
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                className="cast-member__image h-full min-h-[270px] bg-gray-300 w-full rounded-lg"
              />
              <div className="cast-member__name mt-1.5 font-bold">
                {member.name}
              </div>
              <div className="cast-member__character italic text-gray-600">
                as {member.character}
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
