import React from 'react'
import {BsDot} from 'react-icons/bs'
const NotificationCard = ({avatar , title , timestamp}) => {
  return (
    <div className='px-1 hover:bg-white/[0.1] transition-all duration-100 ease-in flex items-center justify-start mt-3 py-2 cursor-pointer'>
       <div className='text-white text-xl mr-2'>
        <BsDot/>
        </div> 
      <div className='h-14 w-14 mr-5'>
        <img src={avatar} alt="pfp"  className='rounded-full'/>
      </div>
      <div >
        <p className='text-white text-lg mb-1 '>{title}</p>
        <p className='text-sm text-gray-500'>{timestamp}</p>
      </div>
    </div>
  )
}

export default NotificationCard
