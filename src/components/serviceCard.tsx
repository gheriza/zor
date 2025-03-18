import { useState, useEffect } from "react";
import { Service } from "@/types/service";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@/hooks/useUser";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const { user } = useUser();
    const [isFavorited, setIsFavorited] = useState(false);

    //check if the service is already favorited
    useEffect(() => {
        if(user) {
            const checkFavorite = async () => {
                const { data } = await supabase 
                    .from("favorites")
                    .select("*")
                    .eq("user_id", user.id)
                    .eq("service_id", service.id);
                setIsFavorited(data?.length > 0);
            };
            checkFavorite();
        }
    }, [user, service.id]);

    const toggleFavorite = async () => {
        if (!user) return alert("you should login to add to favorites.");

        if (isFavorited) {
            await supabase.from("favorites").delete().eq("user_id", user.id).eq("service_id", service.id);
            setIsFavorited(false);
        } else {
            await supabase.from("favorites").insert([{ user_id: user.id, service_id: service.id}]);
            setIsFavorited(true);
        }
    };

    return(
        <div className="bg-white shadow-md rounded-lg overflow-hidden border relative ">
            {/*Image section */}
            <div className="relative w-full h-52">
                <img src={service.image || "/public/images/placeholder.png.webp"} alt={service.title} className="w-full h-full object-cover" />
                {/* Badge */}
                {service.isNew && <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">New</span>}
                {/* Favorite button */}
                <button onClick={toggleFavorite} className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md">
                    <Heart size={20} className={isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"}/>
                </button>
            </div>

            {/* Content section*/}
            <div className="p-4">
                {/**Title & Rating */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <div className="flex items-center text-yellow-500">
                        <Star size={16} className="fill-current"/>
                        <span className="ml-1 text-sm font-semibold">{service.rating || "N/A"}</span>
                    </div>
                </div>

                {/* Location */}
                <p className="text-sm text-gray-500">{service.location}</p>

                {/*Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{service.description}</p>

                {/*Footer: price & Button */}
                <div className="mt-3 flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">{service.price} DZD / nuit</span>
                    <Link href={`/service/${service.id}`} className="text-white bg-blue-600 px-3 py-1 rounded-md">See more</Link>
                </div>
            </div>
        </div>
    );

}