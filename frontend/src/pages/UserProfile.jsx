import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import SingleReview from '../components/SingleReview'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { isAuthenticated, user } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    return <div>Loading user...</div>
  }

  const { data: reviews, isLoading, error, refetch } = useQuery({
    queryKey: ["reviews", user.id],
    queryFn: async () => {
      try {
    const res = await api.get(`reviews/user/${user.id}/`);
    return res.data;
  } catch (err) {
    console.log("Error fetching reviews:", err.response || err);
    throw err;
  }
    },
    enabled: !!user, 
  })

  if (isLoading) return <div>Loading reviews...</div>
  if (error) return <div>Error loading reviews</div>

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950 text-amber-100 flex flex-col items-center space-y-6 p-4">
      <h1 className="font-semibold text-3xl">{user.username}</h1>
      <p>Email: {user.email}</p>

      <h2 className="text-xl mt-4">Your Reviews</h2>
      <hr className="w-full border-amber-100" />
<div className='p-7 max-w-4xl'>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <>
          <p className='font-bold cursor-pointer' onClick={()=>navigate(`/movie/${review.movie_id}`)}>Movie: {review.movie_title}</p>
          <SingleReview
            key={review.id}
            review={review}
            movie={review.movie_id}
            refetch={refetch}
          />
          </>
        ))
      ) : (
        <div>You don't have any reviews</div>
      )}
      </div>
    </div>
  )
}

export default UserProfile
