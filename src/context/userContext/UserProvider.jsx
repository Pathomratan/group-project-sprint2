import { UserContext } from "./UserContext";
import { useState, useEffect } from "react";

/*
ขออนุญาตแก้โค้ดตรงไฟล์ UserProvider.jsx คับ
พอดีตอนรันเทสบนเบราว์เซอร์ที่ยังไม่เคย Login พอมันเปิดหน้าเว็บมามันติด Error จอขาว 
(Uncaught SyntaxError: Unexpected end of JSON input)

สาเหตุคือตอนที่ useState พยายามดึง localStorage.getItem('userInfo') 
มาทำ JSON.parse แบบตรงๆ ทันที ถ้าเป็น User ใหม่ที่ยังไม่มีข้อมูลในเครื่อง 
มันจะดึงค่าเป็น null มา แล้วพอยัดเข้า JSON.parse มันเลยทำให้แอป Crash
*/

export const UserProvider = ({ children }) => {
  // Added safe parsing (try-catch) and null check.
  // Prevents "Unexpected end of JSON input" error when localStorage is empty for new users.
  const [myUserInfo, setMyUserInfo] = useState(() => {
    try {
      const savedUser = localStorage.getItem("userInfo");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      return null;
    }
  });

  // Sync state changes to localStorage.
  // Added condition to remove item on logout instead of saving the string "null".
  useEffect(() => {
    if (myUserInfo === null || myUserInfo === undefined) {
      localStorage.removeItem("userInfo");
    } else {
      localStorage.setItem("userInfo", JSON.stringify(myUserInfo));
    }
  }, [myUserInfo]);

  return (
    <UserContext.Provider value={{ myUserInfo, setMyUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
