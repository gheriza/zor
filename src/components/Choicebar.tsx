"use client"; // Mark this component as a Client Component
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react"; // Import the MapPin icon

const ChoiceBar = () => {
  const [activeChoice, setActiveChoice] = useState("choice1");

  const choices = [
    {
      id: "choice1",
      label: "Alger",
      content: {
        city: "bab Eloued",
        image: "/rooms/room0/room-1-0.jpg",
        bio: "Escape to a tranquil retreat where comfort meets elegance.",
      },
    },
    {
      id: "choice2",
      label: "Djanet",
      content: {
        city: "Djanet",
        image: "/rooms/examples/gaada-sahara.jpg",
        bio: "Discover the charm of this vibrant sahara.",
      },
    },
    {
      id: "choice3",
      label: "Oran",
      content: {
        city: "eyoune Eltourek",
        image: "/rooms/examples/roomex-bengalo.jpg",
        bio: "A perfect blend of tradition and modernity awaits you.",
      },
    },
  ];

  return (
    <div className="p-6">
      {/* Choice Bar */}
      <div className="relative border-b border-black max-w-[80%]">
        <div className="flex space-x-4">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => setActiveChoice(choice.id)}
              className={`px-4 py-2 text-sm font-medium relative ${
                activeChoice === choice.id
                  ? "text-[#4361EE]"
                  : "text-black hover:text-gray-700"
              }`}
            >
              {choice.label}
              {/* Active Choice Border */}
              {activeChoice === choice.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform translate-y-1/2"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        {choices.map((choice) => (
          <div
            key={choice.id}
            className={`${
              activeChoice === choice.id ? "flex flex-col md:flex-row" : "hidden"
            } space-y-6 md:space-y-0 md:space-x-6`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 aspect-video overflow-hidden">
              <Image
                src={choice.content.image}
                width={1100}
                height={900}
                alt={choice.label}
                className="h-full object-cover rounded-br-[15%]"
              />
            </div>

            {/* Text Content */}
            <div className=" flex flex-col pl-10 pt-16">
              {/* City & Bio */}
              <div className="flex items-center space-x-2 text-lg text-blue-700 hover:underline">
                <MapPin className="w-5 h-5" />
                <Link href="_blank">
                <p>{choice.content.city}, {choice.label}</p>
                </Link>
              </div>
              <p className="text-gray-600 mt-2">{choice.content.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoiceBar;
