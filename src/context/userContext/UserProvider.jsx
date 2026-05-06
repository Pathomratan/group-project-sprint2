import { UserContext } from "./UserContext";
import { useState } from "react";

export const UserProvider=({children})=>{
const [myUserInfo,setMyUserInfo]=useState("")

return(

    <UserContext.Provider value={{myUserInfo,setMyUserInfo}}>{children}</UserContext.Provider>
)


}