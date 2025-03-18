import { useState, useEffect } from 'react';

const supportedCurrencies = ['DZD', 'EUR', 'USD', 'TRY', 'CNY', 'JPY', 'RUB', 'GBP'];

export const useCurrency = () => {
  const [currency, setCurrency] = useState<string>('DZD');

  useEffect(() => {
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency && supportedCurrencies.includes(storedCurrency)) {
      setCurrency(storedCurrency);
    }
  }, []);

  const changeCurrency = (curr: string) => {
    if (supportedCurrencies.includes(curr)) {
      setCurrency(curr);
      localStorage.setItem('currency', curr);
    }
  };

  return { currency, changeCurrency };
};
