import React, {useEffect,useState,useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import Style from './NavBar.module.css';
import { ChatAppConect } from "@/app/Context/ChatAppContext";
import { Model,Error } from "..";
import images from "../../assets";


const NavBar = () => {

    const menuItems=[
        {
            menu:"All Users",
            link:"/",
        },
        {
            menu:"CHAT",
            link:"/",
        },
        {
            menu:"CONTACT",
            link:"/",
        },
        {
            menu:"SETTING",
            link:"/",
        },
        {
            menu:"FAQS",
            link:"/",
        },
        {
            menu:"TERMS OF USER",
            link:"/",
        },

    ];

    const [active , setActive ]=useState(2);
    const [open  , setOpen ]=useState(false);
    const [openModel  , setOpenModel ]=useState(false);

    const {account, userName,connectWallet} =useContext(ChatAppConect);














    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box} >
              <div className={Style.NavBar_box} >
                </div>

            </div>
        </div>

    );
         
};

export default NavBar;