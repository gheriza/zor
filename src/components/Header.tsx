"use client"; // Mark as a Client Component
import Link from "next/link";
import { Button } from "@/components/ui/button"; // shadcn Button
import { Menu } from "lucide-react"; // Import Menu icon
import { useLanguage } from "@/hooks/useLanguage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
// Define supported currencies
type Currency = "USD $" | "EUR €" | "GBP £" | "JPY ¥" | "CNY ¥" | "DZD د.ج";

// Define Header Props
interface HeaderProps {
  setShowSignup?: (show: boolean) => void;
}

export default function Header({ setShowSignup }: HeaderProps) {
  const { language, toggleLanguage, textContent, flagPath } = useLanguage();
  const [currency, setCurrency] = useState<Currency>("USD $");
  const router = useRouter();

  const handleSignupButtonClick = () => {
    if (setShowSignup) {
      setShowSignup(true);
    } else {
      router.push("/auth/signup");
    }
  };
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    // Simulate search results (replace with your actual search logic)
    const results = [`Result 1 for "${query}"`, `Result 2 for "${query}"`];
    setSearchResults(results);
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-[#ffffff] z-50 text-sm py-2 px-4 h-16 flex items-center shadow-lg rounded-b-2xl">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center text-3xl text-[#4361EE] font-extrabold tracking-wide">
          ZOR
          <Image src="/icons/makam2.png" alt="" width={30} height={30} />
          
        </Link>
        <SearchBar onSearch={handleSearch}/>
        <div className="mt-4">
          {searchResults.map((result, index) => (
            <p key={index}>{result}</p>
          ))}
        </div>
        {/* Navigation Buttons */}
        <nav className="hidden md:flex space-x-4 items-center">
          {/* About */}
          <Link href="/about">
            <Button className="text-[#4361EE] bg-transparent rounded-3xl text-sm hover:bg-[#4361EE] hover:text-[#FFFFFF] transition duration-200">
              {textContent.about}
            </Button>
          </Link>

          {/* Signup */}
          <Button
            className="text-[#4361EE] bg-transparent rounded-3xl text-sm hover:bg-[#4361EE] hover:text-[#FFFFFF] transition duration-200"
            onClick={handleSignupButtonClick} // Add onClick handler
          >
            {textContent.inscription}
          </Button>

          {/* Currency Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-[#4361EE] bg-white rounded-3xl text-sm hover:bg-[#4361EE] hover:text-[#FFFFFF] transition duration-200">
                {currency}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-[#4361EE] bg-white  text-sm hover:bg-[#4361EE] hover:text-[#FFFFFF] transition duration-200">
              {["USD $", "EUR €", "GBP £", "JPY ¥", "CNY ¥", "DZD د.ج"].map((cur) => (
                <DropdownMenuItem key={cur} onClick={() => setCurrency(cur as Currency)} className="hover:bg-white hover:text-[#4361EE] transition duration-200">
                  {cur}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Toggle */}
          <Button
            className="text-[#4361EE] bg-transparent rounded-3xl text-sm hover:bg-[#4361EE] hover:text-[#FFFFFF] transition duration-200"
            onClick={toggleLanguage}
          >
            <img src={flagPath} alt={language} className="w-6 h-6 border rounded-full" />
          </Button>

          {/* Menu Button */}
          <Button className="text-[#4361EE] bg-transparent rounded-3xl text-sm hover:bg-[#4361EE] hover:text-[#FFFFFF] transition duration-200">
            <Menu size={28} />
          </Button>
        </nav>
      </div>
    </header>
  );
}