import React from 'react'

const Pagination = ({pageHandler, page, dynamicPage}) => {
 
  const getPages = (current, total)=>{
    const pages = []

    if (total <= 5){
      for (let i= 1; i<=total ; i++){
        pages.push(i);
      }
    }else{
      if (current <=3){
        pages.push(1,2,3,"...",total);
      }else if(current>=total -2){
        pages.push(1,"...",total-2, total-1, total);

      }else{
        pages.push(1,'...',current-1,current, current+1,'...',total);
      }
    }
    return pages;
  }

  const handlePrev = ()=>{
    if (page>1){
      pageHandler(page-1)
    }
  }
  
  const handleNext = ()=>{
    if (page<dynamicPage){
      pageHandler(page+1)
    }
  }
  return (
    <div className='flex items-center justify-center space-x-2 mt-6'>
    <button onClick = {handlePrev} disabled={page===1} className={`px-4 py-2 rounded-xl cursor-pointer transition duration-300 ${page===1? 'bg-[#eab8e4] text-gray-400 cursor-not-allowed': 'bg-[#c71585] text-amber-100 hover:bg-[#a34380]' }`}>Prev</button>

    {getPages(page, dynamicPage).map((item, index) => (
        <span
          key={index}
          onClick={() => typeof item === 'number' && pageHandler(item)}
          className={`px-3 py-1 rounded-md cursor-pointer transition duration-200 ${
            item === page
              ? 'text-amber-100  font-bold shadow-md'
              : typeof item === 'number'
              ?'text-amber-50 cursor-default':
              'text-gray-50'
          }`}
        >
          {item}
        </span>
      ))}


      <button
        onClick={handleNext}
        disabled={page === dynamicPage}
        className={`px-4 py-2 rounded-xl cursor-pointer transition duration-300 ${
          page === dynamicPage
            ?'bg-[#eab8e4] text-gray-400 cursor-not-allowed': 'bg-[#c71585] text-amber-100 hover:bg-[#a34380]'
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination