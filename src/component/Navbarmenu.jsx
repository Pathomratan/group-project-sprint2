// src/component/Navbarmenu.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Settings, History } from "lucide-react";
import Logo from "../assets/picture/Logo.png";
import Slogan from "../assets/picture/slogan.png";

// Import Context ตามโค้ดของเพื่อน
import { UserContext } from "../context/userContext/UserContext";

const Navbarmenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // ดึง Context ของเพื่อนมาใช้งาน
  const { myUserInfo, logout } = useContext(UserContext);

  const [cartCount, setCartCount] = useState(0);

  // Sync cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("crispyCart");
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const count = cartItems.reduce((sum, item) => sum + item.qty, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // ล้าง localStorage ของตะกร้า และจัดการ Logout ผ่าน Context (ถ้าเพื่อนมีฟังก์ชัน)
    localStorage.removeItem("isLoggedIn"); // เผื่อเพื่อนใช้
    setIsProfileOpen(false);

    // ถ้าเพื่อนมีฟังก์ชัน logout ใน Context ให้เรียกใช้ด้วย
    if (logout) {
      logout();
    }

    navigate("/");
  };

  // เช็คสถานะ Login จาก Context ของเพื่อน แทน LocalStorage แบบเดิม
  const isLoggedInUser = myUserInfo !== null && myUserInfo !== undefined;

  return (
    <header className="bg-primary text-neutral shadow-lg sticky top-0 z-[100]">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo Section */}
        <div className="relative w-36 h-12 flex items-center">
          <Link
            to="/"
            className="absolute -top-4 left-0 z-50 transition-transform hover:scale-105"
          >
            <img
              src={Logo}
              alt="Logo"
              className="h-37 w-auto max-w-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
            />
          </Link>
        </div>

        {/* Slogan (Desktop Only) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <img
            src={Slogan}
            alt="Slogan"
            className="h-17 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <ul className="flex space-x-6 font-['Bebas_Neue'] text-xl tracking-wider pt-1">
            <li>
              <Link
                to="/"
                className="hover:text-[#e4002b] transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className="hover:text-[#e4002b] transition duration-300"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/order"
                className="hover:text-[#e4002b] transition duration-300"
              >
                Order
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-4 border-l-2 border-neutral/20 pl-6 ml-2">
            {/* Cart Icon */}
            <Link
              to="/menu?cart=open"
              className="relative p-2 hover:text-[#e4002b] transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#e4002b] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login Button (ผสม Logic เพื่อน) */}
            {isLoggedInUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-[#242424] text-white px-4 py-2 rounded-full font-['IBM_Plex_Sans_Thai'] text-sm hover:bg-[#e4002b] transition-colors"
                >
                  <User size={18} />
                  <span>Account</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border-2 border-[#242424] rounded-xl py-2 flex flex-col font-['IBM_Plex_Sans_Thai'] overflow-hidden">
                    <div className="px-4 py-2 border-b-2 border-gray-100 mb-1">
                      {/* ดึงชื่อจาก Context เพื่อนมาแสดง */}
                      <p className="font-bold text-[#242424] truncate">
                        {myUserInfo?.name || "Customer"}
                      </p>
                    </div>
                    <button
                      onClick={() => alert("Future Feature: Edit Profile")}
                      className="flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 text-[#242424]"
                    >
                      <Settings size={16} /> Edit Info
                    </button>
                    <button
                      onClick={() => alert("Future Feature: Order History")}
                      className="flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 text-[#242424]"
                    >
                      <History size={16} /> Order History
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-left hover:bg-[#e4002b] hover:text-white text-red-600 font-bold border-t-2 border-gray-100 mt-1"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-secondary hover:bg-[#e4002b] text-neutral px-6 py-2 rounded-full font-semibold transition duration-300 font-['Bebas_Neue'] text-xl tracking-wider shadow-md"
              >
                SIGN IN
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/menu?cart=open" className="relative p-2 text-neutral">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#e4002b] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-neutral"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-primary border-t border-accent/20`}
      >
        <ul className="flex flex-col p-4 space-y-4 font-['Bebas_Neue'] text-xl tracking-wider">
          <li>
            <Link to="/" className="block hover:text-[#e4002b]">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/menu" className="block hover:text-[#e4002b]">
              MENU
            </Link>
          </li>
          <li>
            <Link to="/order" className="block hover:text-[#e4002b]">
              ORDER
            </Link>
          </li>

          {isLoggedInUser ? (
            <>
              <li>
                <button
                  onClick={() => alert("Go to profile")}
                  className="block text-left w-full hover:text-[#e4002b]"
                >
                  ACCOUNT
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block text-red-500 w-full text-left"
                >
                  SIGN OUT
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="block text-center w-full bg-[#242424] text-white py-3 rounded-lg"
              >
                SIGN IN
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbarmenu;
