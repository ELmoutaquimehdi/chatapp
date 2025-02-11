"use client"
import React,{useState,useEffect, Children} from "react";
import { useRouter } from "next/navigation";

import { CheckIfWalletConnected,connectWallet,connectingWithContract } from "../Utils/apiFeature";


export const ChatAppConect = React.createContext();

export const ChatAppProvider = ({children}) => {


    const [account , setAccount]=useState("");
    const [userName , setUserName]=useState("");
    const [friendLists,setFriendLists]=useState([]);
    const [friendMsg,setFriendMsg]=useState([]);
    const [loading , setLoading]=useState(false);
    const [userLists,setUserLists]=useState([]);
    const [error,setError]=useState("");
    //CHAT USER DATA
    const [currentUserName, setCurrentUserName]=useState("");
    const [currentUserAddress,setCurrentUserAddress]=useState("");

    const router = useRouter();

    //FETCH DATA TIME OF PAGE LOAD

    const fetchData = async()=>{
        try{
            //GET CONTRACT 
            const contract = await connectingWithContract();
            //GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //GET USER NAME
            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);
            //GET MY FRIEND LIST
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //GET ALL APP USER LIST 
            const userList = await contract.getAllAppUser();
            setUserLists(userList);

        }catch(error){
            setError("Please Install And Connect Your Wallet");

        }
    };
    useEffect(() =>{
        fetchData();
    },[]);

    const readMessage = async(friendAddress)=>{
        try{
            const contract = await  connectingWithContract();
            const read  = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        }catch(error){
            setError("Currently You Have no Message");
        }
    };

    const createAccount = async({name,accountAddress})=>{
        try{
            if(name || accountAddress) 
                return setError("Name And AccountAddress , cannot be empty");
            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        }catch(error){
            setError("Error while creating your account pleas reload browser ");
        }
    };

    const addFriends = async ({name,accountAddress}) =>{
        try{
            if(name || accountAddress)return setError("Please provide data");

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress,name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        }catch(erro){
            setError("Something went wrong while adding friends try again");
        }
    }


    const sendMessage = async({msg,address})=>{
        try{
            if(msg || address) return setError("Please Type your Message");
            const contract = await connectingWithContract();
            const addMessage = await contract.senMessage(address,msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        }catch(error){
            setError("Please reload and try again");
        }
    };

    const readUser = async (userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    };








    return(
        <ChatAppConect.Provider value={{
            readMessage, 
            createAccount,
            addFriends,
            sendMessage,
            readUser,
            connectWallet,
            CheckIfWalletConnected,
            account,
            userName,
            friendLists,
            friendMsg,
            userLists,
            loading,
            error,
            currentUserName,
            currentUserAddress,
            }}>
            {children}
        </ChatAppConect.Provider>

    );


};

