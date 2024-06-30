import React, { useState, useEffect, useRef } from 'react';
import Cards from '../cards/card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import "./slider.css"
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ScrollableCarousel = ({ title, fetchUrl }) => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollLeft -= 500;
    };

    const scrollRight = () => {
        carouselRef.current.scrollLeft += 500; 
    };

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            let res = await fetch(fetchUrl);
            let data = await res.json();
            setData(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [fetchUrl]); 

    return (
        <div className="container px-12 bg-gray-900 ">
            <div className='text-3xl mx-8 mt-4 font-semibold max-sm:text-xl max-sm:mx-2'>{title}</div>
        <div className="carousel-container relative flex items-center w-full">
            <MdChevronLeft size={40} className="carousel-icon absolute top-1/2 -translate-y-1/2 cursor-pointer bg-white bg-opacity-50 text-black p-2 rounded-3xl left-2.5 z-40 text-xl" onClick={scrollLeft} />
            <style>{`
                .carousel::-webkit-scrollbar {
                    display: none;
                }
                .carousel {
                    -ms-overflow-style: none;  
                    scrollbar-width: none;  
                }
            `}</style>
            <div className="carousel p-8 flex overflow-x-scroll scroll-smooth touch-overflow-scrolling scrollbar-none " ref={carouselRef}>
                {data.map((movie,index) => (
                    <div key={movie.id} className="container">
                        <Cards movie={movie} index={index} title={title} />
                    </div>
                ))}
            </div>
            <MdChevronRight size={40} className="carousel-icon absolute top-1/2 -translate-y-1/2 cursor-pointer bg-white bg-opacity-50 text-black p-2 text-xl rounded-3xl right-2.5 z-40" onClick={scrollRight} />
        </div>
        </div>
    );
};

export default ScrollableCarousel;
