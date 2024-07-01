import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
// import "./styles.css"
import { Link } from "react-router-dom"

const Cards = ({movie,title,index}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

      
  if (!movie || !movie.poster_path) {
    return null;
  }

    return <>
    {
        isLoading
        ?
        <div className="cards inline-block transition-transform duration-200 relative rounded-xl overflow-hidden m-[0.19rem] cursor-pointer min-w-[200px] h-[300px] z-0 border border-solid border-gray-700 hover:scale-125 hover:z-40 hover:shadow-xl">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={movie.release_date?`/movie/${movie.id}`:`/tvshow/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards inline-block transition-transform duration-200 relative rounded-xl overflow-hidden m-[0.19rem] cursor-pointer min-w-[200px] h-[300px] border z-0 border-solid border-gray-700 hover:scale-125 hover:z-40 hover:shadow-xl">
                <img className="cards__img h-[300px]" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
                {title === "Trending Tv Shows" && (
                                <div className="ranking absolute top-4 left-0 bg-gray-600 text-white text-xs p-1 rounded-tr-2xl w-1/2 rounded-br-2xl text-center ">
                                    #{index + 1} Trending
                                </div>
                            )}
                <div className="cards__overlay absolute bottom-0 p-4 pt-0 flex flex-col justify-end w-[85%] h-full bg-gradient-to-l from-transparent to-black bg-opacity-50 opacity-0 transition-opacity duration-200 hover:opacity-100">
                    <div className="card__title font-black text-xl mb-2">{movie?movie.original_title?movie.original_title:movie.original_name:""}</div>
                    <div className="card__runtime text-xs mb-1">
                        {movie?movie.release_date?movie.release_date:movie.first_air_date:""}
                        <span className="card__rating float-right">{movie&& movie.vote_average?movie.vote_average.toFixed(2):""}<i className="fas fa-star ml-1 hover:text-yellow-400" /></span>
                    </div>
                    <div className="card__description italic text-xs mb-1 ">{movie ? movie.overview.slice(0,100)+"..." : ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}

export default Cards