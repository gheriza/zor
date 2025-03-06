// src/components/SearchBar.tsx
"use client"; // Important for client-side interactivity
import Image from "next/image";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void; // Function to handle search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center w-full max-w-md"> {/* Added w-full and max-w-md for size control */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="border p-2 rounded-l focus:outline-none w-full" // Added w-full to input
      />
      <button
        onClick={handleSearch}
        className="bg-blue-700 text-white p-2 hover:bg-blue-600 flex items-center justify-center" // added flex justify center align items center
      >
        <Image src="/icons/search.png" alt="Search" width={20} height={20} />
      </button>
    </div>
  );
};

export default SearchBar;