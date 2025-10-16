import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    country: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      country: params.get("country") || "",
      genre: params.get("genre") || "",
      year: params.get("year") || "",
    });
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (filters.country) query.append("country", filters.country);
    if (filters.genre) query.append("genre", filters.genre);
    if (filters.year) query.append("year", filters.year);

    navigate(`/movies/filter?${query.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 mt-6">

      <select
        name="country"
        value={filters.country}
        onChange={handleChange}
        className="bg-transparent border border-amber-100 text-amber-100 rounded px-3 py-2"
      >
        <option value="" className="bg-[#341539] text-amber-50">All Countries</option>
           <option value="US" className="bg-[#341539] text-amber-50">United States</option>
        <option value="IN" className="bg-[#341539] text-amber-50">India</option>
        <option value="KR" className="bg-[#341539] text-amber-50">Korea</option>
        <option value="JP" className="bg-[#341539] text-amber-50">Japan</option>
        <option value="FR" className="bg-[#341539] text-amber-50">France</option>
        <option value="NP" className="bg-[#341539] text-amber-50">Nepal</option>
        
      </select>

      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="bg-transparent border border-amber-100 text-amber-100 rounded px-3 py-2"
      >
        <option value="" className="bg-[#341539] text-amber-50">All Genres</option>
        <option value="28" className="bg-[#341539] text-amber-50">Action</option>
        <option value="35" className="bg-[#341539] text-amber-50">Comedy</option>
        <option value="18" className="bg-[#341539] text-amber-50">Drama</option>
        <option value="27" className="bg-[#341539] text-amber-50">Horror</option>
        <option value="10749" className="bg-[#341539] text-amber-50">Romance</option>
        <option value="878" className="bg-[#341539] text-amber-50">Sci-Fi</option>
      </select>
      <select
        name="year"
        value={filters.year}
        onChange={handleChange}
        className="bg-transparent border border-amber-100 text-amber-100 rounded px-3 py-2"
      >
        <option value="" className="bg-[#341539] text-amber-50">All Years</option>
        {Array.from({ length: 25 }, (_, i) => {
          const year = 2025 - i;
          return (
            <option key={year} value={year} className="bg-[#341539] text-amber-50">
              {year}
            </option>
          );
        })}
      </select>

      <button
        onClick={handleFilter}
        className="bg-amber-100 text-purple-900 font-semibold px-4 py-2 rounded hover:bg-[#EAB8E4] transition cursor-pointer"
      >
        Apply
      </button>
    </div>
  );
};

export default Filter;
