"use client";
import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";

export default function Reels() {
    const [reels, setReels] = useState<any[]>([]);

    useEffect(() => {
        const fetchReels = async () => {
            const res = await databases.listDocuments(
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_COLLECTION_ID!
            );
            setReels(res.documents);
        };
        fetchReels();
    }, []);

    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
            {reels.map((reel) => (
                <div key={reel.$id} className="snap-start">
                    <VideoCard reel={reel} />

                </div>
            ))}
        </div>
    );
}
