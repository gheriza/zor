'use client'; // Mark as a Client Component
import { FaTiktok, FaFacebook, FaInstagram } from "react-icons/fa";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react"; // Add useState to handle language and currency state

// Currency type for the dropdown
type Currency = "USD $" | "EUR €" | "GBP £" | "JPY ¥" | "CNY ¥" | "DZD د.ج"; 

export default function Footer() {
  const { language, toggleLanguage } = useLanguage();
  
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD $"); // Default currency

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as any); // Force the type to be `Language`
    toggleLanguage(); // Call toggleLanguage from the custom hook
  };

  // Handle currency change
  const handleCurrencyChange = (newCurrency: Currency) => {
    setSelectedCurrency(newCurrency);
  };

  return (
      <footer className="bg-[#4361EE] w-full h-[70vh]">
          <div className="flex flex-col space-y-4">
          <p className=" text-white font-sans p-4 rounded-lg pl-80 pt-20">Zor</p>
        </div>
      <div className="flex w-full space-x-8 pt-8 pl-80">
        
        {/* Zor Title */}

        {/* Company Section */}
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-white font-medium">Company</p>
          <div className="space-y-2">
            <h6 className="text-white hover:text-black">About us</h6>
            <h6 className="text-white hover:text-black">News</h6>
            <h6 className="text-white hover:text-black">Careers</h6>
            <h6 className="text-white hover:text-black">Press</h6>
            <h6 className="text-white hover:text-black">Companies and Groups</h6>
            <h6 className="text-white hover:text-black">Ratings</h6>
            <h6 className="text-white hover:text-black">Investor Relations</h6>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col space-y-4 pl-24">
          <p className="text-sm text-white font-medium">Social Media</p>
          <div className="flex flex-row space-x-4">
            <a href="https://www.tiktok.com" target="_blank">
              <FaTiktok className="text-white hover:text-black" size={22} />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <FaFacebook className="text-white hover:text-black" size={22} />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagram className="text-white hover:text-black" size={22} />
            </a>
          </div>
        </div>

        <div className="flex flex-col space-y-4 pl-24">
          <p className="text-sm text-white font-medium">ASSISTANCE</p>
          <h6 className="space-y-2 text-white hover:text-black">Aide</h6>
        </div>

              {/* Language Select Section */}
            <div>  
        <div className="flex flex-col space-y-4 pl-24">
          <p className="text-sm text-white font-medium">LANGUAGE</p>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full bg-blut-500  text-white px-4 py-2 rounded-3xl">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="it">Italiano</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Currency Select Section */}
        <div className="flex flex-col space-y-4 pl-24 pt-10">
          <p className="text-sm text-white font-medium">CURRENCY</p>
          <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-full bg-blue-500  text-white px-4 py-2 rounded-3xl">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD $">USD $</SelectItem>
              <SelectItem value="EUR €">EUR €</SelectItem>
              <SelectItem value="GBP £">GBP £</SelectItem>
              <SelectItem value="JPY ¥">JPY ¥</SelectItem>
              <SelectItem value="CNY ¥">CNY ¥</SelectItem>
              <SelectItem value="DZD د.ج">DZD د.ج</SelectItem>
            </SelectContent>
          </Select>
                  </div>
       </div> 
      </div>
    </footer>
  );
}
