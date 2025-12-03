import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKeys } from '@/lib/translations';

export type PlasticType = 'shampoo' | 'oil' | 'detergent' | 'pet';
export type OrderStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'seller' | 'buyer' | null;

export interface Order {
  id: string;
  plasticType: PlasticType;
  image: string;
  mrp: number;
  reward: number;
  status: OrderStatus;
  createdAt: Date;
  bankDetails?: BankDetails;
}

export interface BankDetails {
  bankName: string;
  branchName: string;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrderBankDetails: (id: string, details: BankDetails) => void;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  t: TranslationKeys;
  step: number;
  setStep: (step: number) => void;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [step, setStep] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setOrders((prev) => [...prev, newOrder]);
    setCurrentOrder(newOrder);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
    if (currentOrder?.id === id) {
      setCurrentOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const updateOrderBankDetails = (id: string, details: BankDetails) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, bankDetails: details } : order
      )
    );
    if (currentOrder?.id === id) {
      setCurrentOrder((prev) => (prev ? { ...prev, bankDetails: details } : null));
    }
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        orders,
        addOrder,
        updateOrderStatus,
        updateOrderBankDetails,
        currentOrder,
        setCurrentOrder,
        t,
        step,
        setStep,
        showNotification,
        setShowNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
