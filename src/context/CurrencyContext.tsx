import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext<unknown>(null);
const defaultCurrency = 'DZD';

const rates: unknown = {
  DZD: 1,
  EUR: 145,
  USD: 135,
  TRY: 4,
  GBP: 170,
  CNY: 20,
  JPY: 1.2,
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency) setCurrency(storedCurrency);
  }, []);

  const changeCurrency = (curr: string) => {
    setCurrency(curr);
    localStorage.setItem('currency', curr);
  };

  const formatPrice = (amount: number) =>
    `${(amount * rates[currency]).toFixed(2)} ${currency}`;

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
