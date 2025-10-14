import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import api from "../api";

const SingleMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: movieData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie_details", id],
    queryFn: async () => {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10 text-amber-100 bg-gradient-to-br from-purple-950 via-black to-purple-950 w-full h-screen">Loading movie...</div>
    );

  if (isError)
    return (
      <div className="text-center py-10  text-amber-100 bg-gradient-to-br from-purple-950 via-black to-purple-950 w-screen h-full">
        Error loading movie: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      {/* Backdrop Section */}
      <div className="relative w-full h-[70vh] min-h-[400px] max-h-[600px] flex justify-center items-center bg-black overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt={movieData.title}
          className="h-full w-full object-cover brightness-90"
        />

        {/* Vignette Effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 90% 85% at center,
              transparent 20%,
              rgba(0, 0, 0, 0.4) 60%,
              black 100%
            )`,
          }}
        ></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
      </div>


      <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-evenly bg-gradient-to-br from-black via-black to-purple-950 px-7 pb-10 space-x-11 ">
        

        <div className="md:w-1/4 w-1/3 flex justify-center md:sticky md:top-10 md:self-start mb-6 md:mb-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            alt={movieData.title}
            className="w-full max-w-[300px] rounded-2xl shadow-2xl border border-purple-900 shadow-purple-900"
          />
        </div>

        <div className="md:w-3/4 text-center w-full md:self-start md:text-left text-amber-100 md:max-h-[80vh] overflow-y-auto space-y-4 pr-4">
          <h1 className="font-bold text-3xl">{movieData.title}</h1>
          <p className="italic text-amber-200">{movieData.tagline}</p>
          <p>
            <span className="font-semibold">Genre:</span>{" "}
            {movieData.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="leading-relaxed text-gray-300">{movieData.overview}</p>

          <p>
            <span>Country:</span>{" "}
            {movieData.production_countries.map((country)=>country.name).join(", ")}

          </p>    <p>
            <span className="font-semibold">Release Date:</span>{" "}
            {movieData.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span>{" "}
            {movieData.vote_average} / 10 ({movieData.vote_count} votes)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
