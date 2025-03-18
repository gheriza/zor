import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import AvatarUpload from './AvatarUpload';


interface User {
    id: string;
    avatar?: string;
  }
  
  interface UserMenuProps {
    user: User;
  }

export default function UserMenu({ user }: UserMenuProps){
    const [isOpen, setIsOpen] = useState(false);
    const [avatarurl, setAvatarUrl] = useState(user.avatar || "/images/avatar/avatar3.png");

    const menuItems = [
        {name: "Profil", path: "/src/app/user/profile.tsx"},
        {name: "Reservations", path: "/src/app/user/bookings.tsx"},
        {name: "Favorites", path: "/src/app/user/favorites.tsx"},
        {nmae: "settings", path: "/src/app/user/settings.tsx"},
    ];

    return(
        <div className="relative">
            {/**Bouton Menu (avatar + Fleche) */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 p-2 rounded-lg">
                <img src={avatarurl} alt="User Avatar" className="w-10 h-10 rounded-full border" />
                <ChevronDown size={20}/>
            </button>

            {/**Menu deroulant avec animation */}
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-2"
                >
                    {/* Avatar Upload */}
                    <div className="text-center p-2 border-b">
                        <img src={avatarurl} alt="Avatar" className="w-16 h-16 rounded-full mx-auto"/>
                        <AvatarUpload userId={user.id} onUploadSuccess={setAvatarUrl} />
                    </div>

                    {/* Liens de menu */}
                    <ul className="mt-2">
                        {menuItems.map((item) =>(
                            <li key={item.path}>
                                <Link href={item.path} className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center">
                                    <LogOut size={18} className="mr-2"/>
                                    LogOut
                            </button>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
}