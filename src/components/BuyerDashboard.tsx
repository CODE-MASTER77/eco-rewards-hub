import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Building2, Check, X, Package, IndianRupee } from 'lucide-react';

const BuyerDashboard: React.FC = () => {
  const { t, setStep, setRole, orders, updateOrderStatus } = useApp();

  const pendingOrders = orders.filter((order) => order.status === 'pending');

  const handleBack = () => {
    setRole(null);
    setStep(2);
  };

  const getPlasticLabel = (type: string) => {
    switch (type) {
      case 'shampoo':
        return t.shampooBottle;
      case 'oil':
        return t.oilBottle;
      case 'detergent':
        return t.detergentBottle;
      case 'pet':
        return t.petBottle;
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen eco-gradient-radial p-4">
      <div className="max-w-2xl mx-auto pt-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl eco-gradient flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{t.iAmBuyer}</h1>
          </div>
        </div>

        {/* Pending Orders Section */}
        <div className="card-eco p-5 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            {t.pendingOrders}
          </h2>

          {pendingOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">{t.noOrders}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-muted/50 border border-border"
                >
                  {/* Image */}
                  <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={order.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {t.plasticType}:
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {getPlasticLabel(order.plasticType)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-foreground">
                        {t.reward}:
                      </span>
                      <span className="flex items-center text-primary font-bold">
                        <IndianRupee className="w-4 h-4" />
                        {order.reward.toFixed(2)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateOrderStatus(order.id, 'approved')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-success text-success-foreground font-medium hover:opacity-90 transition-opacity"
                      >
                        <Check className="w-4 h-4" />
                        {t.approve}
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                        {t.reject}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Orders History */}
        {orders.length > 0 && (
          <div className="card-eco p-5">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              All Orders ({orders.length})
            </h2>
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={order.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {getPlasticLabel(order.plasticType)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{order.reward.toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={`status-badge ${
                      order.status === 'pending'
                        ? 'status-pending'
                        : order.status === 'approved'
                        ? 'status-approved'
                        : 'status-rejected'
                    }`}
                  >
                    {order.status === 'pending'
                      ? t.pending
                      : order.status === 'approved'
                      ? t.approved
                      : t.rejected}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
