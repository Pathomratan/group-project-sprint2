import React, { useState } from "react";
import { menuData } from "../../assets/menuData";
import Hero from "../../component/customer/Hero";
import BrandValue from "../../component/customer/BrandValue";
import PromoCarousel from "../../component/customer/PromoCarousel";
import OrderStep from "../../component/customer/OrderStep";
import FinalCTA from "../../component/customer/FinalCTA";
import Footer from "../../component/customer/Footer";
import InteractivePoolGrid from "../../component/customer/InteractivePoolGrid";
import PickupConfirmation from "../../component/pickupconfirmation";
import Check from "../../component/Check";
import OrderStatus from "../../component/OrderStatus";

export default function IndexPage({ t }) {
  const [showPickup, setShowPickup] = useState(false);
  const [showStatus, setShowStatus] = useState(true);

  const topSales = menuData?.filter((item) => item.badge === "top-sale") || [];
  const newUpdates = menuData?.filter((item) => item.badge === "new") || [];
  const promotions = menuData?.filter((item) => item.badge === "promo") || [];

  const highlightItems = [
    ...promotions.slice(0, 1),
    ...topSales.slice(0, 2),
    ...newUpdates.slice(0, 1),
  ];

  return (
    <div className="bg-[#eeeeee] min-h-screen flex flex-col font-['IBM_Plex_Sans_Thai']">
      <PickupConfirmation
        isOpen={showPickup}
        onClose={() => setShowPickup(false)}
        orderNo="ORD-2024-0507"
        menuList={[
          "ไก่ทอดสูตรดั้งเดิม 2 ชิ้น",
          "มันฝรั่งทอดขนาดใหญ่ 1 ที่",
          "เครื่องดื่มเป๊ปซี่ 1 แก้ว"
        ]}
        totalPrice="189.00"
        deliveryTime="15:30 (วันนี้)"
        comment="ขอซอสมะเขือเทศเพิ่มครับ"
      />

      <OrderStatus
        isOpen={showStatus}
        onClose={() => setShowStatus(false)}
        status="กำลังเตรียมอาหาร"
        timeDelivery="16:00"
        orderNo="ORD-999-TH"
        menuList={["ข้าวยำไก่แซ่บ", "นักเก็ต 6 ชิ้น"]}
        contact="081-234-5678"
      />

      <div className="w-full bg-[#242424] pt-24 pb-8">
        <Hero />
      </div>

      <main className="flex-1 w-full flex flex-col">
        <BrandValue />

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-12">
          {highlightItems.length > 0 && (
            <PromoCarousel
              title="SERIOUS SELECTIONS"
              items={highlightItems}
              t={t}
            />
          )}
        </div>

        <OrderStep />
      </main>

      {/* Interactive Grid แบบลายน้ำกระเพื่อม ครอบส่วนจบของเว็บ */}
      <InteractivePoolGrid>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-20">
          <FinalCTA />
        </div>
        <div className="w-full mt-20">
          <Footer />
        </div>
      </InteractivePoolGrid>
    </div>
  );
}
