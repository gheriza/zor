import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Choicebar from "@/components/Choicebar";
import UserHeader from "@/components/user/UserHeader";




export default function Homepage() {
  return (
    <div className="w-full overflow-hidden">
      {/* Pass the setShowSignup function to the Header */}
        <UserHeader/>
      {/* First Section */}
      <div className="bg-green-300 relative w-full h-screen flex flex-col justify-center items-center text-center">
        <h3 className="text-4xl pt-36">Why Algeria?</h3>
        <p className="pt-10 max-w-3xl px-4 text-2xl">
          Algeria is an untouched paradise for travelers seeking breathtaking nature,
          rich history, and authentic cultural experiences. Unlike crowded tourist hotspots,
          Algeria offers raw beauty and adventure, making it a perfect destination for those who love to explore.
        </p>
      </div>

      {/* Second Section */}
      <div className="bg-white text-black relative w-full overflow-hidden flex flex-col mb-16">
        <div className="px-12 py-16">
          <h3 className="text-4xl">Dream vacation</h3>
          <p className="pt-6 max-w-2xl">
            A room for a night in a relaxing and long-term stay as you want,
            there is always a room whenever you <span className="text-pink-500">Zor</span> Algeria.
          </p>
        </div>

        {/* Images Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
          {/* Left Column */}
          <div className="flex flex-col space-y-8">
            <div className="relative w-full h-[250px]">
              <Image
                src="/rooms/examples/gaada-sahara.jpg"
                alt="Place 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            <h6 className="text-lg">Place 1</h6>

            <div className="relative w-full h-[250px]">
              <Image
                src="/rooms/examples/roomex2.jpg"
                alt="Place 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            <h6 className="text-lg">Place 2</h6>
          </div>

          {/* Middle Column (Large Image) */}
          <div className="flex flex-col items-center">
            <div className="relative w-full h-[500px]">
              <Image
                src="/rooms/examples/roomex-calù.jpg"
                alt="Place 3"
                fill
                className="object-cover"
                style={{ borderTopRightRadius: '20%' }} // Inline style for 20% border radius
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
            <h6 className="text-lg mt-4">Place 3</h6>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-8">
            <div className="relative w-full h-[250px]">
              <Image
                src="/rooms/examples/roomex-luxury.jpg"
                alt="Place 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            <h6 className="text-lg">Place 4</h6>

            <div className="relative w-full h-[250px]">
              <Image
                src="/rooms/examples/roomex-calm.jpg"
                alt="Place 5"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            <h6 className="text-lg">Place 5</h6>
          </div>
        </div>

        {/* Show More Button */}
        <div className="text-center mt-12">
          <Button className="bg-[#4361EE] text-white text-lg  hover:text-[#EED043] border-2 hover:bg-[#4361EE]  duration-300 rounded-3xl">
            Show more
          </Button>
        </div>
      </div>

      {/* Third Section */}
      <div className="bg-gray-100 relative w-full h-auto flex flex-col px-12 py-16">
        <h1 className="font-serif text-2xl ml-20">A stay steeped in creativity and culture</h1>
        <p className="pt-8 max-w-2xl ml-20">
          From award-winning interiors to personalized neighborhood guides,
          our stays celebrate the uniqueness of each city we live in.
        </p>
        <div className="w-full pt-12 ml-14">
          <Choicebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}