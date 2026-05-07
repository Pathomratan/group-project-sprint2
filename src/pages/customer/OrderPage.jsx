import React, { useContext, useState, useEffect } from "react";
import { OrdersContext } from "../../context/ordersContext/OrdersContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Trash2, PlusCircle, MessageSquare, CheckCircle2, Edit2, X, ChevronLeft, ShoppingCart } from "lucide-react";
import { MENU } from "../../assets/menuData";

// --- ส่วนแสดงรายการสินค้าในตะกร้า (Middle Panel จาก cart.html) ---
const OrderItem = ({ item, orderId, onUpdateQty, onRemove, onEdit, isSelected }) => {
  return (
    <div 
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 cursor-pointer mb-2
        ${isSelected ? 'bg-[#fff5f510] border-2 border-orange-500' : 'bg-[#1a1a1a] border-2 border-transparent hover:bg-[#222]'}`}
      onClick={() => onEdit(item)}
    >
      {/* Thumbnail Placeholder แบบใน cart.html */}
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#333] flex-shrink-0 flex items-center justify-center text-2xl">
        {item.emoji || "🍗"}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-100 text-sm truncate">{item.name}</h3>
        <p className="text-sm text-orange-500 font-bold">
          {item.price ? `${(item.price * item.quantity).toLocaleString()} บาท` : "รอระบุราคา"}
        </p>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 uppercase font-medium">
          <MessageSquare size={10} /> {item.note || 'No Note'} | {item.size || 'Regular'}
        </div>
      </div>
      
      {/* Qty Control สไตล์ cart.html */}
      <div className="flex items-center bg-[#262626] rounded-lg border border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={() => onUpdateQty(orderId, item.id, -1)} 
          className="w-8 h-8 flex items-center justify-center hover:bg-[#333] text-gray-400"
          disabled={item.quantity <= 1}
        > - </button>
        <span className="w-8 text-center font-bold text-gray-200 text-xs">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQty(orderId, item.id, 1)} 
          className="w-8 h-8 flex items-center justify-center hover:bg-[#333] text-gray-200"
        > + </button>
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onRemove(orderId, item.id); }} 
        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

const OrderPage = () => {
  const { orderList, setOrderList } = useContext(OrdersContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State สำหรับการเลือกไอเทมมาปรับแต่ง (Left Panel)
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ spicy: "เผ็ดกลาง", size: "Regular", note: "None" });

  useEffect(() => {
    if (location.state?.customizingItem) {
      setCustomizingItem(location.state.customizingItem);
    }
  }, [location.state]);

  const handleUpdateQty = (orderId, itemId, change) => {
    const updated = orderList.map(order => {
      const key = order.List ? "List" : "orderList";
      if (order.orderId === orderId) {
        return { 
          ...order, 
          [key]: order[key].map(item => 
            item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
          ) 
        };
      }
      return order;
    });
    setOrderList(updated);
  };

  const handleRemove = (orderId, itemId) => {
    if (window.confirm("ลบรายการนี้ออกจากตะกร้า?")) {
      const updated = orderList.map(order => {
        const key = order.List ? "List" : "orderList";
        if (order.orderId === orderId) {
          return { ...order, [key]: order[key].filter(item => item.id !== itemId) };
        }
        return order;
      }).filter(order => (order.List || order.orderList).length > 0);
      setOrderList(updated);
      if (customizingItem?.id === itemId) setCustomizingItem(null);
    }
  };

  const calculateTotal = () => {
    return orderList?.reduce((total, order) => {
      const items = order.List || order.orderList || [];
      return total + items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    }, 0) || 0;
  };

  const subTotal = calculateTotal();
  const tax = subTotal * 0.07;
  const netTotal = subTotal + tax;

  return (
    <div className="py-10 bg-[#111] min-h-screen text-white font-['Kanit']">
      <main className="container mx-auto px-4 max-w-7xl">
        
        {/* Page Title */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
          <h1 className="text-3xl font-bold tracking-tight">MY CART</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── LEFT PANEL: Product Preview & Customize (ยึดจาก cart.html) ── */}
          <div className="lg:col-span-3 bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            <div className="h-56 bg-[#222] flex flex-col items-center justify-center relative">
              {customizingItem ? (
                <>
                  <span className="absolute top-4 right-4 bg-red-600 text-[10px] px-3 py-1 rounded-full font-bold animate-pulse">กำลังแก้ไข</span>
                  <div className="text-7xl mb-2">{customizingItem.emoji || "🍗"}</div>
                  <div className="text-sm font-bold text-gray-300">{customizingItem.name}</div>
                </>
              ) : (
                <div className="text-center text-gray-500 p-6">
                  <ShoppingCart size={40} className="mx-auto mb-4 opacity-20" />
                  <p className="text-xs">เลือกรายการจากตะกร้า<br/>เพื่อปรับแต่งรสชาติ</p>
                </div>
              )}
            </div>

            {customizingItem ? (
              <div className="p-6 space-y-5">
                <div className="flex gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                </div>
                <h3 className="text-lg font-bold">Customize Menu</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">ความเผ็ด</label>
                    <select className="w-full bg-[#111] border border-gray-700 rounded-xl p-2.5 text-sm mt-1 focus:border-red-600 outline-none">
                      <option>ไม่เผ็ด</option><option>เผ็ดน้อย</option><option selected>เผ็ดกลาง</option><option>เผ็ดมาก</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">ขนาด</label>
                    <select className="w-full bg-[#111] border border-gray-700 rounded-xl p-2.5 text-sm mt-1 focus:border-red-600 outline-none">
                      <option>Regular</option><option>Large</option><option>Family Bucket</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={() => setCustomizingItem(null)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold transition-all mt-4"
                >
                  บันทึกการปรับแต่ง
                </button>
              </div>
            ) : (
              <div className="p-10 text-center text-gray-600 text-xs italic">
                คลิกที่รายการในตะกร้าเพื่อแก้ไข
              </div>
            )}
          </div>

          {/* ── MIDDLE PANEL: Order List (ยึดจาก OrderPage.jsx) ── */}
          <div className="lg:col-span-5 bg-[#1a1a1a] rounded-3xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              Order Summary <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-md">{orderList.length} รายการ</span>
            </h2>
            
            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {orderList.length === 0 ? (
                <div className="text-center py-20 text-gray-600 italic">ตะกร้าของคุณยังว่างอยู่</div>
              ) : (
                orderList.map((order) => (
                  <div key={order.orderId}>
                    {(order.List || order.orderList || []).map((item) => (
                      <OrderItem 
                        key={item.id} 
                        item={item} 
                        orderId={order.orderId} 
                        onUpdateQty={handleUpdateQty} 
                        onRemove={handleRemove} 
                        onEdit={setCustomizingItem}
                        isSelected={customizingItem?.id === item.id}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={() => navigate("/menu")}
              className="mt-6 w-full py-4 border-2 border-dashed border-orange-500/30 text-orange-500 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-500/5 transition-all"
            >
              <PlusCircle size={20} /> เพิ่มรายการอาหารอื่น
            </button>
          </div>

          {/* ── RIGHT PANEL: Totals (ผสมดีไซน์ cart.html + logic OrderPage) ── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 shadow-2xl">
              <h2 className="text-center font-bold text-gray-400 uppercase tracking-widest text-sm mb-8">สรุปยอดเงิน</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">ราคารวม</span>
                  <span className="font-bold">{subTotal.toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ภาษี (7%)</span>
                  <span className="font-bold">{tax.toLocaleString()} บาท</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">ค่าจัดส่ง</span>
                  <span className="text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded">FREE</span>
                </div>
                
                <div className="pt-6 mt-6 border-t-2 border-gray-800 flex justify-between items-end">
                  <span className="font-bold text-xl">สุทธิ</span>
                  <div className="text-right">
                    <span className="block text-[10px] text-gray-500 uppercase">Total Amount</span>
                    <span className="text-3xl font-black text-red-600 leading-none">
                      {netTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

             
              <button 
                onClick={() => navigate("/payment", { state: { subTotal, tax, netTotal, orderData: orderList } })}
                className="w-full mt-6 py-5 bg-white text-black hover:bg-orange-500 hover:text-white rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 uppercase tracking-tighter"
              >
                ชำระเงินตอนนี้
              </button>
              
              <p className="text-[9px] text-center text-gray-600 mt-6 tracking-widest uppercase">
                Serious Fried Chicken - 100% Quality Guaranteed
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default OrderPage;