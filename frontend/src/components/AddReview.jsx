import React, { useEffect, useState } from 'react'
import api from '../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddReview = ({movie,onSuccess,existingReview}) => {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)

  useEffect(()=>{
    if(existingReview){
      setReview(existingReview.review_text || "");
      setRating(existingReview.ratings || 0);
    }
  },[existingReview])

  const handleSubmit = async(e)=>{

    e.preventDefault()
    try{
      let res
      if (existingReview){
        res = await api.patch(`/reviews/${existingReview.id}/`,{
          review_text: review,
          ratings: rating
        })        
      }else{
     res = await api.post(`/reviews/`,
      {
        review_text:review, 
        ratings:rating,
        movie_id: movie.id,
        movie_title : movie.title
      }
    )}
      if (res.status === 200){
        toast.success("Movie review saved successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });

        if (onSuccess) onSuccess();

        setReview("");
      setRating("");
      }
    }catch(err){
      toast.error("Error saving movie review. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    };
    
  }

  return (
    <div className = "bg-[#290634] text-amber-100 m-2">
      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
        <h1 className='text-2xl semibold p-2'>{existingReview ? 'Edit your review' : `Review ${movie.title}`}</h1>

        <div className='flex flex-col '>
          <label htmlFor='review'>Write your review</label>

          <textarea rows="15" cols="20" className='p-2 focus:border-purple-300 rounded my-2 border border-purple-300' value={review} onChange={(e)=>{setReview(e.target.value)}}/>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='rating'>Rate the movie out of 5</label>
          <input type="number" className='p-2 border border-purple-300 rounded' min = "0" max = "5" value={rating} onChange={(e)=>{setRating(e.target.value)}}/>

        </div>
        <div className='flex justify-center'>
          <button className='p-2 rounded bg-amber-100 brightness-75 text-purple-950 font-semibold hover:bg-[#eab8ef] transition'> {existingReview ? 'Update' : 'Submit'}</button>
        </div>


      </form>
       <ToastContainer />
    </div>
  )
}

export default AddReview