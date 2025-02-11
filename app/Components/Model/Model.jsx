"use client"
import React,{useState,useContext,} from 'react'
import Image from 'next/image';

//Internal IMPORT 
import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppConect } from '@/app/Context/ChatAppContext';
import { Loader } from '../../Components/index';

import username from '../../assets/username.png';
import account from '../../assets/account.png';
import send from '../../assets/send.png';
import close from '../../assets/close.png';



const Model = ({openBox,address,title,head,info,smallInfo,images,functionName}) => {

  const [name,setName]=useState("");
  const [accountAddress,setAccountAddress]=useState("");
  const {loading}=useContext(ChatAppConect);

  
  
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={images} alt="buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title}<span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>
          {
            loading == true ?(
              <Loader/>
            ):(
              <div className={Style.Model_box_right_name}>
            <div className={Style.Model_box_right_name_info}>
              <Image src={username} alt="user" width={30} height={30}/>
              <input 
                 type="text"
                 placeholder='your name'
                 onChange={(e)=> setName(e.target.value)}
              />
            </div>
            <div className={Style.Model_box_right_name_info}>
              <Image src={account} alt="user" width={30} height={30}/>
              <input 
                 type="text"
                 placeholder={address || "Enter address.."}
                 onChange={(e)=> setAccountAddress(e.target.value)}
              />
            </div>

            <div className={Style.Model_box_right_name_btn}>
              <button onClick={()=> functionName({name,accountAddress})}>
                {""}
                <Image src={send} alt="send" width={30} height={30} />
                {""}
                Submit
              </button>  
              <button onClick={()=> openBox(false)}>
                {""}
                <Image src={close} alt="send" width={30} height={30} />
                {""}
                Cancel
              </button>



            </div>

          </div>





            )
          }



          






        </div>



      </div>



    </div>
  )
}

export default Model