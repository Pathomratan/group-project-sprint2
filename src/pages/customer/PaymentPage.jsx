import React, { useContext } from "react";
import { OrdersContext } from "../../context/ordersContext/OrdersContext";
import CheckoutSteps from "../../component/customer/CheckoutStep";
import OrderSummary from "../../component/customer/OrderSummary";

export default function PaymentPage() {
  const { orderList } = useContext(OrdersContext);

  // ดึงรายการอาหารทั้งหมดออกมาจาก orderList เพื่อส่งให้ OrderSummary แบบ Array ชั้นเดียว
  const allCartItems = orderList
    ? orderList.flatMap((order) => order.List || order.orderList || [])
    : [];

  return (
   
    <div className="bg-[#eeeeee] min-h-screen py-10 font-['IBM_Plex_Sans_Thai'] text-[#242424]">
      <main className="container mx-auto px-4 max-w-6xl">
        {/* หัวข้อปรับเป็น Bebas Neue, Uppercase, Tracking กว้างๆ ตามสไตล์ Street */}
        <h1 className="font-['Bebas_Neue'] uppercase tracking-widest text-4xl mb-8 flex items-center gap-3 text-[#242424]">
          {/* แถบตกแต่งใช้ Serious Red (#e4002b) พร้อมเงาแข็งๆ (Brutalist Shadow) */}
          <span className="bg-[#e4002b] w-2 h-9 rounded-full border-2 border-[#242424] shadow-[4px_4px_0_#242424]"></span>
          Checkout
        </h1>

        {/* แบ่ง Grid 3 ส่วน (ซ้าย 2 ส่วน ขวา 1 ส่วน) สำหรับหน้าจอขนาดใหญ่ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ฝั่งซ้าย: ขั้นตอนการจัดส่งและชำระเงิน */}
          <div className="lg:col-span-2">
            {/* หมายเหตุ: ใน Component CheckoutSteps นี้ 
              อย่าลืมปรับเป็น bg-[#ffffff], โค้ง rounded-[2rem], 
              และอาจจะใส่ขอบ border-[1px] หรือเงาเข้มๆ ตาม Design System ด้วยนะครับ 
            */}
            <CheckoutSteps />
          </div>

          {/* ฝั่งขวา: สรุปคำสั่งซื้อ */}
          <div className="lg:col-span-1">
            {/* เช่นเดียวกับ OrderSummary ตรงนี้ควรใช้ Clean White bg-[#ffffff] 
              และทำขอบ/เงาให้เด้งออกมาตามสไตล์ Brutalist
            */}
            <OrderSummary cartItems={allCartItems} />
          </div>

        </div>
      </main>
    </div>
  );
}