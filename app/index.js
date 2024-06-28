import React, {useEffect,useState,useContext} from "react";
import { ChatAppConect } from "./Context/ChatAppContext";

const ChatApp = () => {
    
    const {title} = useContext(ChatAppConect);
    return(
        <div>{title}</div>
    )
    
}


export default ChatApp