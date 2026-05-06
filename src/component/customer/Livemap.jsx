import React, { useState, useEffect } from 'react';

// ---------------------------------------------------------
// 1. Component: แผนที่จำลอง (LiveMap)
// ---------------------------------------------------------
const LiveMap = () => {
  return (
    <div className="w-[65%] relative bg-[#E8EAED] flex items-center justify-center overflow-hidden border-r border-gray-200">
      {/* ปุ่มกลับหน้าหลัก */}
      <button className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full shadow-md text-gray-700 font-semibold hover:bg-gray-50 flex items-center gap-2 z-30">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        กลับหน้าหลัก
      </button>

      {/* เส้นทางจำลอง */}
      <svg className="absolute w-full h-full z-10">
        <path d="M 200,200 Q 400,300 500,600 T 700,800" fill="transparent" stroke="#4A90E2" strokeWidth="5" strokeDasharray="10 10" />
      </svg>
      
      {/* พินบนแผนที่ */}
      <div className="absolute top-[20%] left-[25%] bg-white p-3 rounded-full shadow-lg z-20 text-3xl">🏪</div>
      <div className="absolute top-[55%] left-[55%] bg-orange-500 text-white p-3 rounded-full shadow-lg z-30 text-3xl border-4 border-white animate-bounce">🛵💨</div>
      <div className="absolute bottom-[20%] right-[25%] bg-white p-3 rounded-full shadow-lg z-20 text-3xl">🏠</div>
    </div>
  );
};

// ---------------------------------------------------------
// 2. Component: ส่วนหัวและ ETA (OrderHeader)
// ---------------------------------------------------------
const OrderHeader = ({ orderId, etaMinutes }) => {
  return (
    <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-gray-800 text-lg">Order #{orderId}</div>
        <button className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 transition-colors">
          🆘 แจ้งปัญหา
        </button>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">คาดว่าจะถึงใน</p>
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-extrabold text-gray-900">{etaMinutes} นาที</h1>
          {/* สัญญาณไฟกระพริบ */}
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 3. Component: แถบสถานะ (StatusTimeline)
// ---------------------------------------------------------
const StatusTimeline = ({ currentStep }) => {
  const steps = [
    { id: 1, title: 'ร้านกำลังเตรียมอาหาร', time: '10:15 น.', isActive: currentStep >= 1 },
    { id: 2, title: 'ไรเดอร์รับอาหารแล้ว', time: '10:25 น.', isActive: currentStep >= 2 },
    { id: 3, title: 'กำลังเดินทางไปส่ง', desc: 'ไรเดอร์อยู่ห่างจากคุณ 2.5 กม.', isActive: currentStep >= 3, isCurrent: currentStep === 3 },
    { id: 4, title: 'ถึงที่หมาย', isActive: currentStep >= 4 }
  ];

  return (
    <div className="p-8 pb-4">
      <div className="relative border-l-2 border-gray-200 ml-3">
        {steps.map((step) => (
          <div key={step.id} className="mb-8 flex items-center relative">
            {step.isCurrent ? (
              <div className="absolute -left-[13px] w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow flex justify-center items-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            ) : (
              <div className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 border-white ${step.isActive ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
            
            <div className="ml-6">
              <h4 className={`text-sm font-bold ${step.isCurrent ? 'text-green-600 text-lg' : step.isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                {step.title}
              </h4>
              {step.time && <p className="text-xs text-gray-500 mt-0.5">{step.time}</p>}
              {step.desc && <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 4. Component: การ์ดไรเดอร์ (RiderCard)
// ---------------------------------------------------------
const RiderCard = ({ riderName, rating, vehicle, licensePlate }) => {
  return (
    <div className="px-6 py-4">
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex justify-center items-center text-3xl shadow-sm">🧑‍🚀</div>
          <div>
            <h3 className="font-bold text-gray-900">{riderName} <span className="text-yellow-500 text-sm">⭐ {rating}</span></h3>
            <p className="text-sm text-gray-500">{vehicle}</p>
            <p className="text-sm font-semibold text-gray-700">{licensePlate}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-10 h-10 bg-green-500 text-white rounded-full flex justify-center items-center text-lg shadow hover:bg-green-600 transition">📞</button>
          <button className="w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded-full flex justify-center items-center text-lg shadow hover:bg-gray-100 transition">💬</button>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 5. Component: สรุปออเดอร์ (OrderSummary)
// ---------------------------------------------------------
const OrderSummary = ({ address, items, total }) => {
  return (
    <div className="p-6 border-t border-gray-100 mt-auto bg-gray-50">
      <h3 className="font-bold text-gray-800 mb-3">รายละเอียดการจัดส่ง</h3>
      <div className="flex items-start gap-3 mb-4">
        <div className="text-xl">📍</div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{address.title}</p>
          <p className="text-xs text-gray-500">{address.detail}</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl border border-gray-100">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">รายการอาหาร</h4>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm mb-2 text-gray-800">
            <span>{item.qty}x {item.name}</span>
            <span className="font-semibold">฿{item.price}</span>
          </div>
        ))}
        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
          <span>รวมยอดสุทธิ</span>
          <span>฿{total}</span>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 6. Component หลัก: หน้าจอรวม (Main Layout)
// ---------------------------------------------------------
export default function DeliveryTracking() {
  // จำลอง State ข้อมูลที่ดึงมาจาก API/Backend
  const [deliveryData, setDeliveryData] = useState({
    orderId: '12345',
    etaMinutes: 15,
    currentStep: 3,
    rider: {
      name: 'สมชาย ใจดี',
      rating: '4.9',
      vehicle: 'Honda Wave 110i',
      licensePlate: '1กข 1234'
    },
    address: {
      title: 'คอนโด A ชั้น 5 ห้อง 501',
      detail: 'ถ.สุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กทม.'
    },
    items: [
      { qty: 1, name: 'ชุดไก่ทอดสุดคุ้ม (Size L)', price: 299 },
      { qty: 2, name: 'ชามะนาวเย็น', price: 90 }
    ],
    total: 389
  });

  return (
    <div className="bg-gray-100 h-screen w-full flex items-center justify-center p-6 font-sans">
      <div className="max-w-[1200px] w-full h-[85vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-gray-200">
        
        {/* ซ้าย: แผนที่ */}
        <LiveMap />

        {/* ขวา: แผงข้อมูล (Sidebar) */}
        <div className="w-[35%] h-full bg-white flex flex-col overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <OrderHeader orderId={deliveryData.orderId} etaMinutes={deliveryData.etaMinutes} />
          
          <StatusTimeline currentStep={deliveryData.currentStep} />
          
          <RiderCard {...deliveryData.rider} />
          
          <OrderSummary address={deliveryData.address} items={deliveryData.items} total={deliveryData.total} />
        </div>

      </div>
    </div>
  );
}