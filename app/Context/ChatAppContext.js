"use client"
import React,{useState,useEffect, Children} from "react";
import { useRouter } from "next/navigation";

import { CheckIfWalletConnected,connectWallet,connectingWithContract } from "../Utils/apiFeature";


export const ChatAppConect = React.createContext();

export const ChatAppProvider = ({children}) => {

    const title="Hey Welcome to blockchain Chat App";

    return(
        <ChatAppConect.Provider value={{title}}>
            {children}
        </ChatAppConect.Provider>

    );


};

