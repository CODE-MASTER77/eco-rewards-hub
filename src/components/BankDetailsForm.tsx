import React, { useState } from 'react';
import { useApp, BankDetails } from '@/context/AppContext';
import { ArrowLeft, Building, Landmark, User, CreditCard, Hash, CheckCircle } from 'lucide-react';
import NotificationModal from './NotificationModal';

const BankDetailsForm: React.FC = () => {
  const { t, currentOrder, updateOrderBankDetails, setShowNotification, showNotification } = useApp();
  const [formData, setFormData] = useState<BankDetails>({
    bankName: '',
    branchName: '',
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [errors, setErrors] = useState<Partial<BankDetails>>({});

  const handleChange = (field: keyof BankDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<BankDetails> = {};
    if (!formData.bankName) newErrors.bankName = 'Required';
    if (!formData.branchName) newErrors.branchName = 'Required';
    if (!formData.accountHolder) newErrors.accountHolder = 'Required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Required';
    if (!formData.ifscCode) newErrors.ifscCode = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !currentOrder) return;
    updateOrderBankDetails(currentOrder.id, formData);
    setShowNotification(true);
  };

  if (showNotification) {
    return <NotificationModal />;
  }

  return (
    <div className="min-h-screen eco-gradient-radial p-4">
      <div className="max-w-lg mx-auto pt-4 animate-fade-in">
        {/* Success Header */}
        <div className="card-eco p-6 mb-6 text-center eco-gradient-light">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {t.itemApproved}
          </h2>
          <div className="status-badge status-approved mx-auto">
            <CheckCircle className="w-4 h-4" />
            {t.approved}
          </div>
        </div>

        {/* Bank Details Form */}
        <div className="card-eco p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-primary" />
            {t.bankDetails}
          </h3>

          <div className="space-y-4">
            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.bankName}
              </label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className={`input-eco pl-12 ${errors.bankName ? 'border-destructive' : ''}`}
                  placeholder={t.bankName}
                />
              </div>
            </div>

            {/* Branch Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.branchName}
              </label>
              <div className="relative">
                <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.branchName}
                  onChange={(e) => handleChange('branchName', e.target.value)}
                  className={`input-eco pl-12 ${errors.branchName ? 'border-destructive' : ''}`}
                  placeholder={t.branchName}
                />
              </div>
            </div>

            {/* Account Holder */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.accountHolder}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.accountHolder}
                  onChange={(e) => handleChange('accountHolder', e.target.value)}
                  className={`input-eco pl-12 ${errors.accountHolder ? 'border-destructive' : ''}`}
                  placeholder={t.accountHolder}
                />
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.accountNumber}
              </label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleChange('accountNumber', e.target.value)}
                  className={`input-eco pl-12 ${errors.accountNumber ? 'border-destructive' : ''}`}
                  placeholder={t.accountNumber}
                />
              </div>
            </div>

            {/* IFSC Code */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.ifscCode}
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => handleChange('ifscCode', e.target.value.toUpperCase())}
                  className={`input-eco pl-12 ${errors.ifscCode ? 'border-destructive' : ''}`}
                  placeholder={t.ifscCode}
                />
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} className="btn-eco w-full mt-6">
            {t.receivePayment}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsForm;
