import React, { useState, useRef } from 'react';
import { useApp, PlasticType } from '@/context/AppContext';
import { ArrowLeft, Camera, Loader2, IndianRupee, Send, Clock, XCircle, CheckCircle, Recycle } from 'lucide-react';
import BankDetailsForm from './BankDetailsForm';

const SellerDashboard: React.FC = () => {
  const { t, setStep, setRole, addOrder, currentOrder } = useApp();
  const [plasticType, setPlasticType] = useState<PlasticType>('shampoo');
  const [image, setImage] = useState<string | null>(null);
  const [mrp, setMrp] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reward = mrp ? (parseFloat(mrp) * 0.1).toFixed(2) : '0.00';

  const plasticOptions = [
    { value: 'shampoo' as PlasticType, label: t.shampooBottle },
    { value: 'oil' as PlasticType, label: t.oilBottle },
    { value: 'detergent' as PlasticType, label: t.detergentBottle },
    { value: 'pet' as PlasticType, label: t.petBottle },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setImage(reader.result as string);
          setIsScanning(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setError(null);
    if (!image) {
      setError(t.errorImage);
      return;
    }
    if (!mrp || parseFloat(mrp) <= 0) {
      setError(t.errorMRP);
      return;
    }

    addOrder({
      plasticType,
      image,
      mrp: parseFloat(mrp),
      reward: parseFloat(reward),
      status: 'pending',
    });
  };

  const handleBack = () => {
    setRole(null);
    setStep(2);
  };

  const handleNewSubmission = () => {
    setImage(null);
    setMrp('');
    setError(null);
  };

  // Show Bank Details Form if order is approved
  if (currentOrder?.status === 'approved') {
    return <BankDetailsForm />;
  }

  // Show status view if there's a current order
  if (currentOrder) {
    return (
      <div className="min-h-screen eco-gradient-radial flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="card-eco p-8 text-center">
            {currentOrder.status === 'pending' && (
              <>
                <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-warning animate-pulse" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {t.waitingApproval}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t.pending}
                </p>
                <div className="status-badge status-pending mx-auto">
                  <Clock className="w-4 h-4" />
                  {t.pending}
                </div>
              </>
            )}

            {currentOrder.status === 'rejected' && (
              <>
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-destructive" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {t.itemRejected}
                </h2>
                <div className="status-badge status-rejected mx-auto mb-6">
                  <XCircle className="w-4 h-4" />
                  {t.rejected}
                </div>
                <button onClick={handleNewSubmission} className="btn-eco w-full">
                  {t.newSubmission}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen eco-gradient-radial p-4">
      <div className="max-w-lg mx-auto pt-4 animate-fade-in">
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
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{t.iAmSeller}</h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Plastic Type Selection */}
          <div className="card-eco p-5">
            <label className="block text-sm font-medium text-foreground mb-3">
              {t.selectPlasticType}
            </label>
            <select
              value={plasticType}
              onChange={(e) => setPlasticType(e.target.value as PlasticType)}
              className="select-eco"
            >
              {plasticOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="card-eco p-5">
            <label className="block text-sm font-medium text-foreground mb-3">
              {t.uploadImage}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {isScanning ? (
              <div className="relative aspect-video rounded-xl bg-muted overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-3" />
                  <span className="text-primary font-medium">{t.aiScanning}</span>
                </div>
                <div className="absolute inset-x-0 h-1 bg-primary/50 animate-scan" />
              </div>
            ) : image ? (
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-card/90 backdrop-blur-sm shadow-lg"
                >
                  <Camera className="w-5 h-5 text-foreground" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary flex flex-col items-center justify-center gap-3 transition-colors bg-muted/50"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                  <Camera className="w-7 h-7 text-primary" />
                </div>
                <span className="text-muted-foreground font-medium">{t.uploadImage}</span>
              </button>
            )}
          </div>

          {/* MRP Input */}
          <div className="card-eco p-5">
            <label className="block text-sm font-medium text-foreground mb-3">
              {t.enterMRP}
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                placeholder={t.mrpPlaceholder}
                className="input-eco pl-12"
              />
            </div>
          </div>

          {/* Reward Display */}
          <div className="card-eco p-5 eco-gradient-light">
            <div className="flex items-center justify-between">
              <span className="text-foreground font-medium">{t.recycleReward}</span>
              <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                <IndianRupee className="w-6 h-6" />
                {reward}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">10% of MRP</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button onClick={handleSubmit} className="btn-eco w-full">
            <Send className="w-5 h-5" />
            {t.sendForApproval}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
