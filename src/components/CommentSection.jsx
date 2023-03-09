import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { fetchDataFromAPI } from '../utils/api';
import CommentCard from './CommentCard'
import {toast , Toaster} from 'react-hot-toast'
const CommentSection = ({user , id}) => {
    const [comments,setComments] = useState([])
    const [snapshot , setSnapshot] = useState()
    const [userComment , setUserComment] = useState("");
    const [userCommented , setUserCommented] = useState(false)
    const [visibility,setVisibility]=useState(false)
    const handleVisibility=()=>{
      setVisibility(!visibility)
    }
   
    const styles = !visibility?"hidden":"flex"
    const fetchVideoComments = () => {
      fetchDataFromAPI(`video/comments/?id=${id}`).then((res) => {
          setComments(res.data.comments);
          console.log(comments);
        });
    };
    const handleCommentClick=()=>{
      if(userComment=="") return;
      setUserCommented(true);
      setSnapshot(userComment)
      toast('Comment added successfully!',
            {
                icon: '😄',
                style: {
                borderRadius: '5px',
                background: '#29a329',
                color: '#fff',
                },
            }
        );
    }
  useEffect(()=>{
    fetchVideoComments();
  },[id])
  return (

    <div className='text-white pt-5 pb-2'>
      <Toaster
            position="top-center"
            reverseOrder={false}
            />
      <h1 className='text-xl'>{comments.length} Comments</h1>
      <div className='flex flex-row space-x-3 mt-5'>
        <img src={user.photoURL} alt="" className='h-10 w-10 rounded-full'/>
        <input type="text" placeholder='Add a comment' className='w-full bg-transparent border-b border-white/[0.25] focus:ring-transparent focus:outline-none focus:border-white' onChange={(e)=>{setUserComment(e.target.value)}}/>
      </div>
      <div className='flex space-x-4 justify-end itmes-center mt-4'>
      <div className="flex items-center justify-center font-semibold rounded-full text-black h-11 px-4 bg-white/[0.8] cursor-pointer hover:bg-white hover:transition-all ease-in duration-150 " onClick={(e)=>{
        handleCommentClick();
        e.target.value="";
      }}>
          Comment
      </div>
      <div className="flex items-center justify-center rounded-full h-11 font-semibold px-4 bg-white/[0.15] cursor-pointer hover:bg-white/[0.25] hover:transition-all ease-in duration-150 ">
          Cancel
      </div>
      </div>
      <p className='my-3 font-semibold cursor-pointer hover:text-indigo-300 transition-all ease-in duration-150 hover:bg-white/[0.15] px-3 py-2 w-fit' onClick={handleVisibility}>{visibility?"Hide Comments":"Show Comments"}</p>
      {userCommented && 
        <CommentCard styles={styles} avatar={user.photoURL} body={snapshot} title={user.displayName} likes = {0} replies={0}/>
      }
      {comments?.length && comments.map(comment =>(
        <div key={comment.commentId}>
          <CommentCard styles={styles} avatar={comment.author.avatar[2].url} body={comment.content} title={comment.author.title} likes = {comment.stats.votes} replies ={comment.stats.replies}/>
        </div>
      ))}
      {comments.length == 0 && 
      <div className='text-center py-5 text-gray-500 text-2xl'>
        Comments have been turned off.
        </div>}
    </div>
  )
}

export default CommentSection
