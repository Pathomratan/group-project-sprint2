// export default App;
import { useState } from 'react';
import "../App.css";


// --- ดึงข้อมูลจากรูป Sitemap (i18n simulated) ---
const translations = {
  TH: {
    menu: "เมนู", order: "สั่งอาหาร", register: "สมัครสมาชิก/เข้าสู่ระบบ", reward: "รางวัล",
    pickupType: "Type of pickup",
    allergen: "ข้อมูลสารก่อภูมิแพ้", contact: "ติดต่อเรา",
    promoTitle: "PROMOTION POPUP",
    whereToEat: "Where u want to eat / เลือกลงชื่อสาขาที่ใกล้ที่สุด",
    menuDesc: "Type สินค้าโชว์เป็นหมวดหมู่!",
    detailsSet: "รายละเอียดส่วนของเซ็ตนั้นๆ: 12 Wings + 8 Nuggets",
    allergy: "Ingredient / Allergy",
    deliveryActive: "Delivery (Active)",
    pickup: "Pick-up",
    booking: "Booking",
  },
  EN: {
    menu: "Menu", order: "Order", register: "Register/Login", reward: "Reward",
    pickupType: "Type of pickup",
    allergen: "Allergen Information", contact: "Contact",
    promoTitle: "PROMOTION POPUP",
    whereToEat: "Where u want to eat (Select branch)",
    menuDesc: "Type: Products by Category!",
    detailsSet: "Set details: 12 Wings + 8 Nuggets",
    allergy: "Ingredient / Allergy",
    deliveryActive: "Delivery (Active)",
    pickup: "Pick-up",
    booking: "Booking",
  }
};

const themes = [
  'street', 'genz', '90s', 'thai', 'luxury', 'abstract'
];

function App() {
  const [lang, setLang] = useState('TH');
  const [currentTheme, setCurrentTheme] = useState('genz'); // ค่าเริ่มต้นธีม GenZ
  const t = translations[lang];

  // คลาสสไตล์หลักสำหรับตัวเว็บ
  const bodyClassName = `font-sans text-black bg-greywhite min-h-screen flex flex-col theme-${currentTheme}`;

  return (
    <>
 
    <div className={bodyClassName}>
      
      {/* --- TEST THEME SWITCHER (Dropdown สำหรับทดสอบการสลับธีม) --- */}
      <div className="fixed top-20 right-4 z-999 bg-white p-4 border border-black shadow-lg">
        <label className="font-bold text-sm block mb-2">Test Theme Switcher:</label>
        <select 
          className="bg-greywhite text-black px-2 py-1 outline-none font-bold text-sm"
          value={currentTheme} 
          onChange={(e) => setCurrentTheme(e.target.value)}
        >
          {themes.map(themeName => (
            <option key={themeName} value={themeName}>{themeName.toUpperCase()} THEME</option>
          ))}
        </select>
      </div>
      {/* ------------------------------------------------------------- */}

      
      {/* 2. BACKGROUND SPACE (#EEEEEE) & MAIN CONTENT */}
      <main className="grow p-6 bg-greywhite">
        
        {/* Promotion Popup (Simulated Inline) */}
        <div className="bg-cream border-l-4 border-red p-4 mb-6 relative shadow-lg theme-street:border-4 theme-street:border-red theme-genz:rounded-3xl theme-90s:border-4 theme-90s:border-black theme-thai:border-thai-pattern">
          <button className="absolute top-2 right-2 text-black font-bold">Close X</button>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-red">{t.promoTitle}</h2>
              <p className="text-sm mt-1 text-orange">Score bar: ⭐⭐⭐⭐⭐ | Img</p>
            </div>
            <div className="bg-black text-greywhite px-4 py-2 theme-genz:rounded-xl theme-90s:border-black theme-90s:border-inset">
              <p className="font-bold text-sm">{t.whereToEat}</p>
              <div className="flex space-x-2 mt-2">
                <button className="bg-red px-2 py-1 text-white text-xs font-bold">{t.pickup}</button>
                <button className="bg-orange px-2 py-1 text-white text-xs font-bold">{t.deliveryActive}</button>
                <button className="bg-greywhite text-black px-2 py-1 border border-black text-xs font-bold">{t.booking}</button>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs font-bold underline cursor-pointer text-orange hover:text-red">Customer allergic information ?</p>
        </div>

        {/* 3. MENU SECTION (#EEEEEE / #F5F0E8) */}
        <section id="menu" className="mb-10">
          <div className="bg-black text-greywhite inline-block px-4 py-1 mb-4 font-bold text-lg theme-street:border-b-4 theme-street:border-red theme-genz:rounded-full">
            {t.menuDesc}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Menu Card รูป ราคา รายละเอียด */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-cream p-4 flex flex-col relative group hover:shadow-2xl transition-all theme-street:border-t-8 theme-street:border-red theme-street:asymmetric-corners theme-genz:rounded-3xl theme-90s:border-black theme-90s:border-inset theme-thai:thai-border-pattern theme-luxury:minimal-border">
                
                {/* IMG รูปเมนู */}
                <div className="h-48 bg-greywhite flex items-center justify-center border border-black/10 mb-4 theme-genz:rounded-3xl">
                  [ IMG รูปเมนู ]
                </div>
                
                {/* Price Tag (สี #CF0A0A หรือ #DC5F00) */}
                <div className="absolute top-0 right-0 bg-red text-greywhite px-3 py-1 font-bold text-xl theme-street:jagged-price theme-genz:rounded-bl-full theme-90s:border-4 theme-90s:border-black">
                  $199
                </div>
                
                <div className="flex flex-col grow text-center">
                  <h3 className="font-bold text-xl mb-1 group-hover:text-red transition theme-luxury:font-serif">ชุดรวมสุดคุ้ม (ชุด A)</h3>
                  <p className="text-sm mb-2 grow text-black/70">{t.detailsSet}</p>
                  <p className="text-xs text-orange mt-auto font-bold underline cursor-pointer hover:text-red">{t.allergy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 4. FOOTER & TYPE OF PICKUP (สีดำ #000000) */}
      <footer className="bg-black text-greywhite w-full">
        {/* แถบเลือก Type of Pickup */}
        <div className="bg-black border-b border-greywhite/20 p-4 flex justify-center items-center space-x-6 theme-genz:bg-cream theme-genz:text-black">
          <span className="font-bold">{t.pickupType}</span>
          <button className="bg-orange text-greywhite px-4 py-1 font-bold text-sm theme-genz:rounded-full">{t.deliveryActive}</button>
          <button className="border border-greywhite px-4 py-1 hover:bg-greywhite hover:text-black transition text-sm theme-genz:border-black">{t.pickup}</button>
          <button className="border border-greywhite px-4 py-1 hover:bg-greywhite hover:text-black transition text-sm theme-genz:border-black">{t.booking}</button>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
          <a href="#allergen" className="hover:text-orange">{t.allergen}</a>
          <a href="#contact" className="hover:text-orange">{t.contact}</a>
          <a href="#social" className="hover:text-orange">Social Media</a>
          <a href="#app" className="hover:text-orange">Application</a>
        </div>
      </footer>

    </div>
    </>
  );
}

export default App;
