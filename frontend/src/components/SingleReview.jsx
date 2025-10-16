import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import AddReview from './AddReview'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';

const SingleReview = ({review, movie, refetch}) => {

  const {isAuthenticated, user} = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false)
  const [edit, setEdit] = useState(false)

  const max = 200
  const isLong = review.review_text.length>max

  const handleDelete = async()=>{
    try{
      const res = await api.delete(`/reviews/${review.id}/`)
      if (res.status === 200){
        toast.success("Movie review deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,})

          if (refetch) refetch();
      }
    }catch(err){
      console.log(err)
     toast.error("Error deleting movie review. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  return (
    <div className='flex flex-col space-y-4 text-amber-100'>
          <p className="">Review by <b className='text-amber-50'>{review.username}</b></p>
          <p className={`${!expanded && isLong? 'line-clamp-4': 
            ''
          }`}>{review.review_text}</p>
          {
            isLong && (
              <button className="text-purple-400 font-semibold hover:underline self-start"
          onClick={() => setExpanded(!expanded)}
        >{expanded? 'Show less': 'Show more'}</button>
            )
          }
          <p>{review.likes} likes</p>
           {isAuthenticated && user.id === review.user && (
        <div className="flex space-x-4">
          <button className="text-yellow-400 hover:underline" onClick={()=>setEdit(true)}>Edit</button>
          <button className="text-red-400 hover:underline"  onClick={handleDelete}>Delete</button>
          {edit && (
 <div className="fixed inset-0 flex items-end justify-center  bg-opacity-70 z-50 transition-opacity duration-300">
  <div className="relative w-11/12 rounded-xl p-6 bg-[#290634] border border-amber-100 brightness-75 shadow-lg transform transition-transform duration-300 scale-100">
      
      <button
        onClick={() => setEdit(false)}
        className="absolute top-2 right-2 text-amber-100 border border-amber-50 p-1 rounded font-bold"
      >
        X
      </button>

      <AddReview
        movie={movie}
        existingReview={review}
        onSuccess={() => {
          setEdit(false);
          refetch();
        }}
      />
    </div>
  </div>
)}
        </div>
       
      )}
          <hr/>
          <ToastContainer/>

        </div>
  )
}

export default SingleReview