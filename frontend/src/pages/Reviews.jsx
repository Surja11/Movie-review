import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useMemo } from 'react'
import api from '../api'
import axios from 'axios'
import SingleReview from '../components/SingleReview'
import { AuthContext } from '../context/AuthContext'

const Reviews = ({movie, refetchReview}) => {

  const {isAuthenticated,user} = useContext(AuthContext)

  const {data: reviews, isLoading, error, refetch} = useQuery({
    queryKey: [`review_${movie.id}`],
    queryFn: async()=>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/?movie_id=${movie.id}`)
      return response.data
    }
  })

  

  useEffect(()=>{
    if (refetchReview) refetchReview.current = refetch
  },[refetch, refetchReview])

  


  console.log(reviews)

  const orderedReviews = useMemo(()=>{
    if (!reviews) return []
    if (!isAuthenticated||!user) return reviews

    const userReview = reviews.find(review => review.user ===user.id)
    const other = reviews.filter(review=>review.user!=user.id);

    return userReview?[userReview,...other] :reviews;
  },[reviews, isAuthenticated, user])

if (isLoading) return <p>Loading reviews...</p>;
  if (error) {
    console.log("Full error:", error);
  console.log("Response:", error.response);
  return <p>Error loading reviews: {error.message}</p>;};

  return (
    <div className=" text-amber-100 brightness-90">
      <h1 className='m-3 font-semibold brightness-90 text-2xl text-center'>Reviews</h1> 
      <hr/>
      {orderedReviews && orderedReviews.length>0 ? (
        
        <div>{orderedReviews.map((review)=>(<SingleReview key ={review.id} review = {review} movie={movie} refetch={ refetch}/>))}</div>):(<div>No reviews yet. Be the first one to review the movie.</div>)}

    </div>
  )
}

export default Reviews