import { UserContext } from "./UserContext";
import { useState,useEffect } from "react";

export const UserProvider=({children})=>{
const [myUserInfo,setMyUserInfo]=useState("");
useEffect(()=>{
localStorage.setItem('userInfo',myUserInfo);


setCurrLogin(u);
},[myUserInfo])
const currLogin=localStorage.getItem('userInfo');

return(

    <UserContext.Provider value={{myUserInfo,setMyUserInfo,currLogin}}>{children}</UserContext.Provider>
)


}