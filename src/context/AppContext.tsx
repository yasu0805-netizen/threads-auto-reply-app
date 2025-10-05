import React, { createContext, useContext, useState, ReactNode } from 'react';

// Contextの型定義
interface AppContextType {
  userStyle: '清楚' | 'ギャル' | '大人';
  setUserStyle: (style: '清楚' | 'ギャル' | '大人') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Providerコンポーネント
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userStyle, setUserStyle] = useState<'清楚' | 'ギャル' | '大人'>('清楚');

  return (
    <AppContext.Provider value={{ userStyle, setUserStyle }}>
      {children}
    </AppContext.Provider>
  );
};

// カスタムフック
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};