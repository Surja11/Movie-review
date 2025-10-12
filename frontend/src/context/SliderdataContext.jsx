import { useQuery } from "@tanstack/react-query";
import { createContext } from "react"
import api from "../api";

export const SliderdataContext = createContext(null);

export const SliderdataProvider = ({children})=>{

  //fetching for slider

  const {data: sliderdata, isLoading, error} = useQuery({
    queryKey: ["sliderdata"],
    queryFn: async()=>{
      const res = await api.get("/movies/")
      return res.data.results
    }
    
    
  });

  const getRandomMovies = (movies)=>{
    if (!Array.isArray(movies)) return [];

    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0,4);
  }

  const randomSliderData  = getRandomMovies(sliderdata);

  return <SliderdataContext.Provider value = {{sliderdata: randomSliderData, isLoading, error }}>
    {children}
  </SliderdataContext.Provider>
}