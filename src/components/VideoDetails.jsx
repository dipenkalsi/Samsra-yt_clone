import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike ,AiOutlineDislike , AiFillLike, AiFillDislike} from "react-icons/ai";
import { FiMoreHorizontal} from "react-icons/fi";
import { abbreviateNumber } from "js-abbreviation-number";
import { BiShare } from "react-icons/bi"
import { fetchDataFromAPI } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import CommentSection from "./CommentSection";
import {toast , Toaster} from 'react-hot-toast';
import { GiConsoleController } from "react-icons/gi";

const VideoDetails = ({user}) => {
    const [video, setVideo] = useState();
    const [isLiked , setIsLiked] = useState(false);
    const [isDisliked , setIsDisliked] = useState(false);
    const [descClass, setDescClass] = useState("truncate");
    const [relatedVideos, setRelatedVideos] = useState();
    const { id } = useParams();
    const { setLoading } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.add("custom-h");
        fetchVideoDetails();
        fetchRelatedVideos();
    }, [id]);

    const handleLikeClick=()=>{
        setIsLiked(!isLiked)
        if(!isLiked) setIsDisliked(false)
    }
    const handleDislikeClick=()=>{
        setIsDisliked(!isDisliked)
        if(!isDisliked) setIsLiked(false)
    }

    const fetchVideoDetails = () => {
        setLoading(true);
        fetchDataFromAPI(`video/details/?id=${id}`).then((res) => {
            
            setVideo(res.data);
            setLoading(false);
        });
    };
    const handleShareClick = async()=>{
        toast('Link copied to Clipboard!',
            {
                icon: '😄',
                style: {
                borderRadius: '5px',
                background: '#29a329',
                color: '#fff',
                },
            }
        );
        let text = `https://www.youtube.com/watch?v=${video.videoId}`
            try {
            await navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');
            } catch (err) {
            console.error('Failed to copy: ', err);
            }
      
    }
    const handleDescClick = () => {
        if(descClass==="truncate"){
            setDescClass("");
            
        }
        else{
            setDescClass("truncate")
        }
    }
    const fetchRelatedVideos = () => {
        setLoading(true);
        fetchDataFromAPI(`video/related-contents/?id=${id}`).then((res) => {
           
            setRelatedVideos(res.data);
            setLoading(false);
        });
    };
    console.log(video)
    const publishedDate =video?.publishedDate
    const desc =video?.description
    return (
        <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="min-h-[250px] md:min-h-[400px] lg:min-h-[400px] xl:min-h-[450px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000000" }}
                            playing={true}
                        />
                    </div>
                    <div className="text-white font-semibold md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={video?.author?.avatar[0]?.url}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                <div className="text-white text-md font-semibold flex items-center">
                                    {video?.author?.title}
                                    {video?.author?.badges[0]?.type ===
                                        "VERIFIED_CHANNEL" && (
                                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                                    )}
                                </div>
                                <div className="text-white/[0.7] text-sm">
                                    {video?.author?.stats?.subscribersText}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-white mt-4 md:mt-0">
                           
                            <div className="flex items-center justify-center h-11 rounded-l-full px-2 pl-4 bg-white/[0.15] cursor-pointer hover:bg-white/[0.25] hover:transition-all ease-in duration-150 pr-4" onClick={handleLikeClick}>
                                {isLiked?<AiFillLike className="text-xl text-white mr-2"/> :<AiOutlineLike className="text-xl text-white mr-2" />}
                                {`${abbreviateNumber(
                                    isLiked? video?.stats?.likes +1 :video?.stats?.likes,
                                    2
                                )}`}
                            </div>
                            <div className="flex items-center justify-center h-11 px-2 rounded-r-full bg-white/[0.15] cursor-pointer hover:bg-white/[0.25] hover:transition-all ease-in duration-150 border-l border-white/[0.3]" onClick={handleDislikeClick}>
                                {isDisliked?<AiFillDislike className="text-xl text-white mx-2"/>:<AiOutlineDislike className="text-xl text-white mx-2" />}
                            </div>
                            
                         
                            <div className="flex items-center justify-center h-11 px-6 bg-white/[0.15] ml-4 rounded-full cursor-pointer hover:bg-white/[0.25] hover:transition-all ease-in duration-150" onClick={handleShareClick}>
                            <BiShare className="text-xl text-white mr-2" />
                                Share
                            </div>
                            <div className="flex items-center justify-center h-11 px-3 rounded-full bg-white/[0.15] ml-4 cursor-pointer hover:bg-white/[0.25] hover:transition-all ease-in duration-150">
                            <FiMoreHorizontal className="text-xl text-white " />
                            </div>
                        </div>
                    </div>
                        <div className="text-gray-400 pt-1 pb-5 bg-white/[0.15] mt-5 px-3 transition-all ease-in duration-150 ">
                            <p className="text-white mb-2 ">{`${abbreviateNumber(
                                    video?.stats?.views,
                                    2
                                )} Views`} <span className=" text-[34px] leading-none font-bold text-white/[0.7] relative top-[-3px] mx-1 inline">
                                .
                            </span> Published at - {publishedDate}</p>
                           <p className={`font-light ${descClass} text-sm`}>{desc}</p> 
                           <p className={`text-white  hover:text-indigo-400 cursor-pointer transition-all ease-in duration-150 w-fit`} onClick={handleDescClick}>{descClass===""?"Show Less":"Show More"}</p> 
                            </div>
                            <CommentSection user={user} id={video?.videoId}/>
                </div>
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {relatedVideos?.contents?.map((item, index) => {
                        if (item?.type !== "video") return false;
                        return (
                            <SuggestionVideoCard
                                key={index}
                                video={item?.video}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;