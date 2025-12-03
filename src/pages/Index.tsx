import React from 'react';
import { useApp } from '@/context/AppContext';
import LanguageSelector from '@/components/LanguageSelector';
import RoleSelector from '@/components/RoleSelector';
import SellerDashboard from '@/components/SellerDashboard';
import BuyerDashboard from '@/components/BuyerDashboard';

const Index: React.FC = () => {
  const { step, role } = useApp();

  // Step 1: Language Selection
  if (step === 1) {
    return <LanguageSelector />;
  }

  // Step 2: Role Selection
  if (step === 2) {
    return <RoleSelector />;
  }

  // Step 3: Dashboard based on role
  if (step === 3) {
    if (role === 'seller') {
      return <SellerDashboard />;
    }
    if (role === 'buyer') {
      return <BuyerDashboard />;
    }
  }

  return <LanguageSelector />;
};

export default Index;
