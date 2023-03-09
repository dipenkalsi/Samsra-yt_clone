import { onSnapshot, orderBy, query ,collection} from 'firebase/firestore'
import React from 'react'
import {db} from '../firebase'
import { useEffect } from 'react'
import { useState } from 'react'
import CommentCard from './CommentCard'
const CommentSection = ({user}) => {
    console.log(user)
    const [comments,setComments] = useState([])
    const [visibility,setVisibility]=useState(false)
    const handleVisibility=()=>{
      setVisibility(!visibility)
    }
    const styles = !visibility?"hidden":"flex"
    useEffect(() => {
      const q = query(collection(db, 'comments'), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setComments(messages);
        console.log(comments)
      });
      return () => unsubscribe();
    }, []);
  return (
    <div className='text-white pt-5 pb-2'>
      <h1 className='text-xl'> 130 Comments</h1>
      <div className='flex flex-row space-x-3 mt-5'>
        <img src={user.photoURL} alt="" className='h-10 w-10 rounded-full'/>
        <input type="text" placeholder='Add a comment' className='w-full bg-transparent border-b  border-white/[0.25] focus:ring-transparent focus:outline-none focus:border-white'/>
      </div>
      <div className='flex space-x-4 justify-end itmes-center mt-4'>
      <div className="flex items-center justify-center font-semibold rounded-full text-black h-11 px-4 bg-white/[0.8] cursor-pointer hover:bg-white hover:transition-all ease-in duration-150 ">
          Comment
      </div>
      <div className="flex items-center justify-center rounded-full h-11 font-semibold px-4 bg-white/[0.15] cursor-pointer hover:bg-white/[0.25] hover:transition-all ease-in duration-150 ">
          Cancel
      </div>
      </div>
      <p className='my-3 font-semibold cursor-pointer hover:text-indigo-300 transition-all ease-in duration-150 hover:bg-white/[0.15] px-3 py-2 w-fit' onClick={handleVisibility}>{visibility?"Hide Comments":"Show Comments"}</p>
  
      {comments && comments.map(comment =>(
        <div>
          <CommentCard user={user} ke={comment.id} styles={styles} value={comment.text} timestamp={comment.timestamp.seconds}/>
        </div>
      ))}
    </div>
  )
}

export default CommentSection
