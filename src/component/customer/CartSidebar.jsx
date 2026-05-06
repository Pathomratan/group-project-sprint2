// src/component/customer/CartSidebar.jsx
import React from "react";
import { X, ShoppingBag, Minus, Plus } from "lucide-react";
import { MENU } from "../../assets/menuData";

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQty }) => {
  // คำนวณยอดรวมทั้งหมด
  const cartDetails = cartItems.map((cartItem) => {
    const menuData = MENU.find((m) => m.id === cartItem.id);
    return {
      ...menuData,
      qty: cartItem.qty,
      itemTotal: menuData.price * cartItem.qty,
    };
  });

  const totalPrice = cartDetails.reduce((sum, item) => sum + item.itemTotal, 0);

  return (
    <>
      {/* Overlay สีดำ */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ตัวตะกร้า */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-100 bg-white z-50 transform transition-transform duration-300 flex flex-col shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header ตะกร้า */}
        <div className="p-5 bg-[#242424] text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold font-['Bebas_Neue'] tracking-widest flex items-center gap-2">
            <ShoppingBag className="text-[#e4002b]" /> YOUR CART
          </h2>
          <button
            onClick={onClose}
            className="hover:text-[#e4002b] transition"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* รายการอาหาร */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {cartDetails.length === 0 ? (
            <div className="text-center text-gray-400 mt-16 flex flex-col items-center">
              <ShoppingBag size={64} className="mb-4 opacity-30" />
              <p>ตะกร้าของคุณยังว่างเปล่า</p>
            </div>
          ) : (
            cartDetails.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md bg-gray-100"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-[#242424] text-sm leading-tight">
                    {item.name}
                  </h4>
                  <div className="text-[#e4002b] font-black font-['Bebas_Neue'] text-lg">
                    ฿{item.itemTotal}
                  </div>
                </div>

                <div className="flex items-center gap-3 border border-gray-200 rounded-md px-1 py-1 bg-gray-50">
                  <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-4 text-center font-bold text-[#242424] text-sm">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ส่วนสรุปเงินและปุ่ม Checkout */}
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center font-bold text-lg mb-4 text-[#242424]">
            <span>Subtotal</span>
            <span className="text-3xl text-[#e4002b] font-['Bebas_Neue'] tracking-wide">
              ฿{totalPrice.toLocaleString()}.-
            </span>
          </div>
          <button
            className="w-full bg-[#e4002b] text-white font-black font-['Bebas_Neue'] text-2xl py-4 rounded-lg shadow-[0_6px_0_#800018] hover:translate-y-1 hover:shadow-[0_2px_0_#800018] transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cartItems.length === 0}
            onClick={() =>
              alert("ไปหน้า Checkout เลือกว่าจะเพิ่ม Topping หรือกรอกที่อยู่")
            }
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
