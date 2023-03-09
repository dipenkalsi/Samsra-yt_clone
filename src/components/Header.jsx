import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ytLogo from "./logo.png";
import smolLogo from './logo copy.png'
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";
import NotificationCard from "./NotificationCard";

const Header = ({user , signOut}) => {
    const [showModal , setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { loading, mobileMenu, setMobileMenu } = useContext(Context);

    const navigate = useNavigate();

    const handleBackClick=()=>{
        navigate(-1)
    }

    const toggleDrawer = () => {
        setShowModal((prevState) => !prevState)
    }

    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    return (
        <>
         <Drawer
                open={showModal}
                onClose={toggleDrawer}
                direction='right'
                size={350}
                duration={150}
            >
                <div className="bg-[#1a0000] min-h-screen">
                    <h1 className=" text-2xl text-center text-indigo-200 py-3">Notifications</h1>
                    <NotificationCard title="Markiplier uploaded - Lates.." timestamp="11 hours ago" avatar='https://i.pinimg.com/originals/81/65/5f/81655f35bc9dcf038cc1d24b1edd2f5c.png' />
                    <NotificationCard title="Vsauce is live!" timestamp="16 hours ago" avatar='https://yt3.googleusercontent.com/ytc/AL5GRJWvTe2XC80z6_cZh5GZoYhRWaONosagXi6OnhiZGA=s900-c-k-c0x00ffffff-no-rj' />
                    <NotificationCard title="Kurzgesagt uploaded - The..." timestamp="1 day ago" avatar='https://yt3.googleusercontent.com/ytc/AL5GRJWjS7at2j0n5yn5dsfYFe5x_V8QeN66ppWjzChpoQ=s900-c-k-c0x00ffffff-no-rj' />
                    <NotificationCard title="Pewdiepie uploaded - Mem..." timestamp="2 days ago" avatar='https://i.pinimg.com/originals/4f/5a/4b/4f5a4bee6a664f02f19566538e8289fd.png' />
                    <NotificationCard title="Mr.Beast is live!" timestamp="2 days ago" avatar='https://yt3.googleusercontent.com/ytc/AL5GRJUfhQdJS6n-YJtsAf-ouS2myDavDOq_zXBfebal3Q=s900-c-k-c0x00ffffff-no-rj' />
                    <NotificationCard title="PSG is live!" timestamp="2 days ago" avatar='https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png' />
                </div>
            </Drawer>
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-[#1a0000]">
            {loading && <Loader />}

            <div className="flex h-5 items-center">
                {pageName !== "video" ? (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-white text-xl" />
                        ) : (
                            <SlMenu className="text-white text-xl" />
                        )}
                    </div>
                ):(<div
                    className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                >
                    <BiArrowBack className="text-white text-xl" onClick={handleBackClick}/>
                </div>)}
                <Link to="/" className="flex h-6 items-center">
                    <img
                        className="h-full hidden md:block"
                        src={ytLogo}
                        alt="Samsara"
                    />
                </Link>
            </div>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-gray-500 group-focus-within:border-indigo-300 md:group-focus-within:ml-5 md:group-focus-within:pl-0 ">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex ">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-58 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-gray-500 bg-white/[0.1] hover:bg-white/[0.2] transition-all ease-in duration-150"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[1] transition-all ease-in duration-150">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[1] transition-all ease-in duration-150" onClick={toggleDrawer}>
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className=" hover:bg-[#303030]/[1] transition-all ease-in duration-150 cursor-pointer h-10 w-10 md:ml-3 rounded-full">
                <div className="flex h-8 w-8 overflow-hidden rounded-full hover:bg-[#303030]/[1] transition-all ease-in duration-150 cursor-pointer mt-1 ml-1">
                    <img src={user.photoURL} onClick={signOut} />
                </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Header;