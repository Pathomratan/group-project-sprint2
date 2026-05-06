import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbarmenu from "./component/Navbarmenu";
import CookBoard from "./pages/CookBoard";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Buttonmenu from "./component/Buttonmenu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckoutPage from "./pages/cashier/CheckoutPage";
import TableMap from "./pages/shared/TableMap";
import OrderList from "./pages/cashier/OrderList";
import OrderHistory from "./pages/cashier/OrderHistory";
import DriverDashboard from "./component/rider/DriverDashboard";
import OrderDetail from "./component/rider/OrderDetail";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<DriverDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/driver/order/:orderId" element={<OrderDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// export default function App() {
//   return (
//     <Router>
//       <Navbarmenu />
//       <Routes>
//         <Route path="/" element={<Buttonmenu />} />
//         {/* คุณสามารถเพิ่ม Route อื่นๆ เช่น /menu หรือ /order ได้ที่นี่ */}
//         <Route path="/order" element={<Order />} />
//         <Route path="/home" element={<Index />} />

//         {/* เพิ่ม Route ของ chasier / shared (with waiter)  */}
//         <Route path="/cashier/checkout" element={<CheckoutPage />} />
//         <Route path="/shared/tables" element={<TableMap />} />
//         <Route path="/cashier/orders" element={<OrderList />} />
//         <Route path="/cashier/history" element={<OrderHistory />} />
//         <Route path="/menu" element={<Buttonmenu />} />
//         <Route path="/cookBoard" element={<CookBoard />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/register" element={<Register />}></Route>
//       </Routes>
//     </Router>
//   );
// }
