import React from 'react'
import { AiOutlineLike ,AiOutlineDislike } from "react-icons/ai";
import { abbreviateNumber } from 'js-abbreviation-number';

const CommentCard = ({avatar,title,styles,body ,likes, replies}) => {
  return (
    <div className={`flex space-x-3 mt-5 ${styles}`}>
      <img src={avatar||"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"} alt="" className='h-10 w-10 rounded-full'/>
      <div className='flex flex-col'>
        <div className='flex space-x-1 items-center'>
        <p className='font-semibold'>{title}</p>
        <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-7px] mx-1">
            .
        </span>
        <p className='text-white/[0.7] font-thin text-sm'>7 Months ago</p>
        </div>
        <p className='text-white/[0.9] text-sm'>{body}</p>
        <div className='flex space-x-4 mt-2'>
          <div className='flex space-x-1 justify-center items-center'>
            <AiOutlineLike className='cursor-pointer'/>
            <p>{abbreviateNumber(likes)}</p>
          </div>
          <div className='flex space-x-1 justify-center items-center'>
            <AiOutlineDislike className='cursor-pointer'/>
          </div>
          <p className='px-2 py-1 hover:bg-white/[0.15] transition-all ease-in duration-150 text-sm hover:text-indigo-300 cursor-pointer'>Reply</p>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
