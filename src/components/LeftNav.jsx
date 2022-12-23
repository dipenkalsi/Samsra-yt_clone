import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'
import logo from './logo.png'
import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNav = () => {
    const { selectedCategory, setSelectedCategory, mobileMenu } =
        useContext(Context);

    const navigate = useNavigate();

    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                return setSelectedCategory(name);
            case "home":
                return setSelectedCategory(name);
            case "menu":
                return false;
            default:
                break;
        }
    };

    return (
        <div
            className={`md:block w-[220px] overflow-y-auto bg-[#1a0000] h-full py-4 absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
                mobileMenu ? "translate-x-0" : ""
            }`}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-start ml-4 mb-3 md:hidden">
                <img src={logo} alt="" className="w-1/2 h-1/2 "/>
                </div>
                {categories.map((item) => {
                    return (
                        <React.Fragment  key={item.name}>
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                action={() => {
                                    clickHandler(item.name, item.type);
                                    navigate("/");
                                }}
                                className={`${
                                    selectedCategory === item.name
                                        ? "bg-white/[0.15]"
                                        : ""
                                }`}
                            />
                            {item.divider && (
                                <hr className="my-5 border-white/[0.2]" />
                            )}
                        </React.Fragment>
                    );
                })}
                <hr className="my-5 border-white/[0.2]" />
                <div className="text-white/[0.5] text-[12px] pl-2 pb-1">
                    Copyright &copy; Samsara 2022.
                </div>
                <div className="text-white/[0.5] text-[12px] pl-2 pb-1">
                    All rights reserved
                </div>
                <div className="text-white/[0.5] text-[12px] pl-2 pb-1">
                    Made with ❤️ by Dipen Kalsi
                </div>
            </div>
        </div>
    );
};

export default LeftNav;