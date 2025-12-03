import React from 'react';
import { useApp } from '@/context/AppContext';
import { Recycle, Building2, ArrowLeft, Leaf } from 'lucide-react';

const RoleSelector: React.FC = () => {
  const { t, setRole, setStep } = useApp();

  const handleRoleSelect = (role: 'seller' | 'buyer') => {
    setRole(role);
    setStep(3);
  };

  return (
    <div className="min-h-screen eco-gradient-radial flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Back Button */}
        <button
          onClick={() => setStep(1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.back}
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl eco-gradient shadow-lg shadow-primary/30 mb-4">
            <Recycle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t.selectRole}
          </h1>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Seller Card */}
          <button
            onClick={() => handleRoleSelect('seller')}
            className="role-card text-left group"
          >
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:eco-gradient transition-all duration-300">
              <Recycle className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t.iAmSeller}
            </h3>
            <p className="text-muted-foreground">
              {t.sellerDesc}
            </p>
            <div className="flex items-center gap-2 mt-4 text-primary font-medium">
              <Leaf className="w-4 h-4" />
              <span className="text-sm">Earn rewards</span>
            </div>
          </button>

          {/* Buyer Card */}
          <button
            onClick={() => handleRoleSelect('buyer')}
            className="role-card text-left group"
          >
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:eco-gradient transition-all duration-300">
              <Building2 className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t.iAmBuyer}
            </h3>
            <p className="text-muted-foreground">
              {t.buyerDesc}
            </p>
            <div className="flex items-center gap-2 mt-4 text-primary font-medium">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Manage orders</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
