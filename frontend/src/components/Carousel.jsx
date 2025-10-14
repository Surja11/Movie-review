import React, { useContext } from "react";
import { SliderdataContext } from "../context/SliderdataContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";

const Carousel = () => {
  const { sliderdata, isLoading, error } = useContext(SliderdataContext);

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error loading movies</div>;

  
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, display: "block", right: "25px", zIndex: 10 }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, display: "block", left: "25px", zIndex: 10 }}
        onClick={onClick}
      />
    );
  };

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
     
  };

  return (
    <Slider {...settings}>
      {sliderdata?.map((movie) => (
        <div key={movie.id}>
          <div className="flex flex-row justify-between items-center h-[500px] px-10">
           
            <div className="w-1/2 flex flex-col justify-center items-start text-amber-100 space-y-4 pr-8 pl-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <p className="text-sm text-gray-300 line-clamp-4">{movie.overview}</p>
              <NavLink to={`movies/${movie.id}`} className="border p-2 rounded-2xl bg-amber-100  text-purple-950 brightness-80 hover:bg-[#EAB8E4] hover:transition">See More</NavLink>
            </div>

         
            <div className="w-1/2 flex justify-center">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="h-[400px] w-[90%] object-cover rounded-2xl shadow-lg brightness-75"
              />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;