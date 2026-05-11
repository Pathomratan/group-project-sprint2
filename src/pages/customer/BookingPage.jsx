// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import BranchSelector from '../../component/customer/BranchSelector';
import SummaryInform from '../../component/customer/SummaryInform';

export default function BookingPage() {
  const [orderState, setOrderState] = useState({
    type: 'Booking',
    branch: null,
    date: new Date().toISOString().split('T')[0],
    time: '13:00-15:00',
    member: '5P',
    userAddress: '', 
  });

  const [profile, setProfile] = useState({
    name: 'MR. PERSESS',
    email: 'test@gmail.com',
    contact: '+66 258423381123'
  });

  const handleSelectBranch = (branchName) => {
    setOrderState(prev => ({ ...prev, branch: branchName }));
  };

  const handleUpdateAddress = (address) => {
    setOrderState(prev => ({ ...prev, userAddress: address }));
  };

  return (
    // เปลี่ยนพื้นหลังเป็น brand-gray (Concrete)
    <div className="bg-brand-gray text-brand-black font-sans-thai pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto pt-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <BranchSelector 
          onSelectBranch={handleSelectBranch} 
          onUpdateAddress={handleUpdateAddress}
        />
        <SummaryInform
          orderState={orderState} 
          setOrderState={setOrderState} 
          profile={profile} 
          setProfile={setProfile} 
        />
      </div>
    </div>
  );
}