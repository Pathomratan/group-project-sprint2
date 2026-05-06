import { useContext, useState } from "react"
import { usersInfo } from "../assets/usersInfo"
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate,Link } from 'react-router-dom';

export default function Login(){
const navigate= useNavigate();
const {myUserInfo,setMyUserInfo}=useContext(UserContext)


const [loginText,setLoginText]=useState("Hello");
const [inputUsername,setInputUsername]=useState("");
const [inputPassword,setInputPassword]=useState("");
const inputUsernameHandle=(event)=>{setInputUsername(event.target.value);}
const inputPasswordHandle=(event)=>{setInputPassword(event.target.value);}


const checkLogin=()=>{

    const user=usersInfo.find((user)=>(user.username===inputUsername))
    if(user){
        if(user.password===inputPassword){
            setMyUserInfo(user); 
            setLoginText("LoginSuccessful");
            if(user.role==="customer")
             navigate('/menu');
            else if(user.role==="cook"){
             navigate('/cookBoard');
            }
        }
        else{setLoginText("worngPassword");}
        console.log(user);
    }else{
        setLoginText("unkownUsername");
        console.log(loginText);
        
    }

}



return(
<div className="flex flex-col min-w-full  bg-secondary">
<div className="flex flex-col justify-evenly items-center content-evenly  min-h-[80vh] m-[10vh] bg-neutral">
    <span className="font-bold">Login :  
        <input className="  border" value={inputUsername} onChange={inputUsernameHandle} type="text"></input></span>
    <span className="font-bold">password :  
        <input className=" border" value={inputPassword} onChange={inputPasswordHandle} type="password"></input></span>
    <button  className="w-[20vh] bg-secondary hover:bg-accent text-neutral px-6 py-2 rounded-lg font-semibold transition duration-300 cursor-pointer"
     onClick={()=>checkLogin()}>Submit</button>
    <span className="text-secondary font-bold">{loginText}</span>
    <span className="hover:text-secondary text-blue-500 font-bold"><Link to="/register">don't have account? click here to register</Link></span>

</div>
</div>
)

}