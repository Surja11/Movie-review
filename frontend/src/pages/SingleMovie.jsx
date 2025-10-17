import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import api from "../api";
import Reviews from "./Reviews";
import AddReview from "../components/AddReview";
import { AuthContext } from "../context/AuthContext";

const SingleMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [addreview, setAddreview] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const reviewRef = useRef(null);

  const {
    data: movieData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["movie_details", id],
    queryFn: async () => {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    },
  });


  const { data: casts, isLoading: isCastLoading, error: castError } = useQuery({
    queryKey: ["movie_casts", id],
    queryFn: async () => {
      const response = await api.get(`/get_casts/${id}`);
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10 text-amber-100 bg-gradient-to-br from-purple-950 via-black to-purple-950 w-full h-screen">
        Loading movie...
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10  text-amber-100 bg-gradient-to-br from-purple-950 via-black to-purple-950 w-screen h-full">
        Error loading movie: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col items-center">
  
      <div className="relative w-full h-[70vh] min-h-[400px] max-h-[600px] flex justify-center items-center bg-black overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt={movieData.title}
          className="h-full w-full object-cover brightness-90"
        />

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

        <div className="md:w-3/4 text-center w-full md:self-start md:text-left text-amber-100 space-y-4 pr-4">
          <h1 className="font-bold text-3xl">{movieData.title}</h1>
          <p className="italic text-amber-200">{movieData.tagline}</p>
          <p>
            <span className="font-semibold">Genre:</span>{" "}
            {movieData.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="leading-relaxed text-gray-300">{movieData.overview}</p>
          <p>
            <span>Country:</span>{" "}
            {movieData.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>{" "}
          <p>
            <span className="font-semibold">Release Date:</span>{" "}
            {movieData.release_date}
          </p>
          <p>
            <span className="font-semibold">Rating:</span>{" "}
            {movieData.vote_average} / 10 ({movieData.vote_count} votes)
          </p>
          Casts
          <div className="flex flex-wrap gap-4 justify-start mt-4">
  {casts?.cast?.slice(0, 10).map((cast) => ( 
    <div key={cast.cast_id} className="flex flex-col space-y-2 items-center">
      <img
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
            : "/placeholder.png"
        }
        alt={cast.name}
        className="w-24 h-25 object-cover rounded-full brightness-80"
      />
      <p className="text-amber-100 text-sm text-center">{cast.name}</p>
    </div>
  ))}
</div>

          <br />
          <br />
          <div className="flex justify-between">
            <i>Speak your movie mind!</i>{" "}
            <button
              className="p-2 rounded-2xl bg-[#c71585]"
              onClick={() => setAddreview(true)}
            >
              Review it!
            </button>
          </div>
          <br />
          <Reviews movie={movieData} refetchReview={reviewRef} />
          <br/>
          <br/>
        </div>
      </div>

      {addreview && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className=" rounded-xl p-6 bg-[#290634]   border border-amber-100 brightness-75 shadow-lg relative  sm:w-1/2">
            <button
              onClick={() => setAddreview(false)}
              className="absolute top-2 right-2 text-amber-100 border border-amber-50 p-1 rounded font-bold"
            >
              X
            </button>
            {isAuthenticated ? (
              <AddReview
                movie={movieData}
                onSuccess={() => {
                  setAddreview(false);
                  if (reviewRef.current) reviewRef.current();
                }}
              />
            ) : (
              navigate("/login")
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
