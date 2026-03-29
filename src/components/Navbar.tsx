"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="bg-black text-white flex justify-between items-center px-6 py-4">
            <h1 className="text-xl font-bold">🎬 ReelsApp</h1>

            <div className="flex gap-4">
                <Link href="/reels">Reels</Link>
                <Link href="/upload">Upload</Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
