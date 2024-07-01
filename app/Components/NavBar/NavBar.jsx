"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./NavBar.module.css";
import { ChatAppConect } from "@/app/Context/ChatAppContext";
import { Model, Error } from "..";
import images from "../../assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "/",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USER",
      link: "/",
    },
  ];

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { error,account, userName, connectWallet,createAccount } = useContext(ChatAppConect);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* Desktop */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((item, index) => (
              <div
                onClick={() => setActive(index + 1)}
                key={index + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == index + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={item.link}
                >
                  {item.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* Mobile */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((item, index) => (
                <div
                  onClick={() => setActive(index + 1)}
                  key={index + 1}
                  className={`${Style.mobile_menu_items} ${
                    active == index + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link
                    className={Style.mobile_menu_items_link}
                    href={item.link}
                  >
                    {item.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* {Connect Wallet} */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="WELCOME TO "
            head="CHAT MEHDI"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aspernatur adipisci odit fugit earum molestiae aliquid iusto voluptates mollitia? Consectetur totam, consequatur cumque, esse odit quod ea doloremque expedita obcaecati maxime fuga."
            smallInfo = "Kindley seclet your name .. "
            images={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {
        error == "" ? "" : <Error error={error}/>
      }
    </div>
  );
};

export default NavBar;
