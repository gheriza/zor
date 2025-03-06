import { useState } from "react";

// Define the type for supported currencies
type Currency = "USD $" | "EUR €" | "GBP £" | "JPY ¥" | "CNY ¥" | "DZD د.ج";

// Conversion rates (these are mock values; in a real application, you'd fetch these from an API)
const conversionRates: Record<Currency, number> = {
  "USD $": 1,   // Base currency
  "EUR €": 0.85, // Example: 1 USD = 0.85 EUR
  "GBP £": 0.75, // Example: 1 USD = 0.75 GBP
  "JPY ¥": 110,  // Example: 1 USD = 110 JPY
  "CNY ¥": 6.5,  // Example: 1 USD = 6.5 CNY
  "DZD د.ج": 136, // Example: 1 USD = 136 DZD
};

export const useCurrency = () => {
  // State for managing the selected currency
  const [currency, setCurrency] = useState<Currency>("USD $"); // Default currency is USD $
  
  // State for managing the value (e.g., price)
  const [value, setValue] = useState<number>(100); // Default value (e.g., $100)

  // Function to change the currency
  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  // Calculate the value in the selected currency
  const convertedValue = value * (conversionRates[currency] || 1);

  // Optional: Function to set the value (e.g., when the user inputs a number)
  const handleValueChange = (newValue: number) => {
    setValue(newValue);
  };

  return {
    currency,           // Current selected currency
    value,              // Current value in base currency (USD $)
    convertedValue,     // Converted value based on the selected currency
    handleCurrencyChange, // Function to change the selected currency
    handleValueChange,   // Function to set the value
  };
};
