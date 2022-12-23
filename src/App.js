import React from 'react'
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Header from './components/Header'
import Feed from './components/Feed'
import SearchResult from './components/SearchResult'
import VideoDetails from './components/VideoDetails'
import Login from './components/Login'
import { AppContext } from './context/contextApi'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
const App = () => {
  const [user]=useAuthState(auth)
  console.log(user)

  const handleSignOutClick=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  if(user){
  return (
    <AppContext>
   <BrowserRouter>
   <div className='flex flex-col h-full bg-[#1a0000]'>
    <Header user={user} signOut={handleSignOutClick}/>
    <Routes>
      <Route path="/" exact element={<Feed/>} />
      <Route path="/searchResult/:searchQuery" element={<SearchResult/>} />
      <Route path="/video/:id" element={<VideoDetails user={user}/>} />
    </Routes>
   </div>
   </BrowserRouter>
    </AppContext>
  )}
  else{
    return <Login/>
  }
}

export default App
