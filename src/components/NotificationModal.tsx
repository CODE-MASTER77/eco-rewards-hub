import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle, MessageSquare, Smartphone, X, PartyPopper, IndianRupee } from 'lucide-react';

const NotificationModal: React.FC = () => {
  const { t, currentOrder, setShowNotification, setCurrentOrder, setRole, setStep } = useApp();

  const handleClose = () => {
    setShowNotification(false);
    setCurrentOrder(null);
    setRole(null);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="w-full max-w-md card-eco p-8 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="relative inline-flex">
            <div className="w-20 h-20 rounded-full eco-gradient flex items-center justify-center animate-pulse-glow">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2">
              <PartyPopper className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-foreground text-center mb-2">
          {t.paymentSuccess}
        </h2>

        {/* Reward Amount */}
        {currentOrder && (
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary mb-6">
            <IndianRupee className="w-8 h-8" />
            {currentOrder.reward.toFixed(2)}
          </div>
        )}

        {/* Notification Cards */}
        <div className="space-y-3 mb-6">
          {/* SMS Notification */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">SMS</p>
              <p className="text-sm text-muted-foreground">{t.smsNotification}</p>
            </div>
            <CheckCircle className="w-5 h-5 text-success ml-auto flex-shrink-0" />
          </div>

          {/* WhatsApp Notification */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">WhatsApp</p>
              <p className="text-sm text-muted-foreground">{t.whatsappNotification}</p>
            </div>
            <CheckCircle className="w-5 h-5 text-success ml-auto flex-shrink-0" />
          </div>
        </div>

        {/* Close Button */}
        <button onClick={handleClose} className="btn-eco w-full">
          {t.close}
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
