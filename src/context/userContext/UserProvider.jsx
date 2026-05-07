import { UserContext } from "./UserContext";
import { useState,useEffect } from "react";

export const UserProvider=({children})=>{
const [myUserInfo,setMyUserInfo]=useState(JSON.parse( localStorage.getItem('userInfo')));
// const [myUserInfo,setMyUserInfo]=useState();
useEffect(()=>{
    console.log(localStorage.getItem('uerInfo'))
localStorage.setItem('userInfo',JSON.stringify(myUserInfo));
},[myUserInfo])
return(

    <UserContext.Provider value={{myUserInfo,setMyUserInfo}}>{children}</UserContext.Provider>
)
}