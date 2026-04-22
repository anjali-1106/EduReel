"use client";

import { useEffect, useRef, useState } from "react";
import { storage, databases, account } from "@/lib/appwrite";
import { ID } from "appwrite";


export default function VideoCard({ reel }: any) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(reel.title);

    const videoUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        reel.videoId
    );

    // 🔥 AUTO PLAY
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if(video.paused){
                            video.play().catch((err)=>{
                                console.log("play error",err);
                            })
                        }
                    }else{
                        if(!video.pause){
                            video.pause();
                        }
                    }
                    
                });
            },
            { threshold: 0.7 }
        );

        observer.observe(video);
        return () => observer.unobserve(video);
    }, []);

    // 🗑 DELETE
    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            await storage.deleteFile(
                process.env.NEXT_PUBLIC_BUCKET_ID!,
                reel.videoId
            );

            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_COLLECTION_ID!,
                reel.$id
            );

            alert("Deleted successfully");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    // ✏ EDIT TITLE
    const handleUpdate = async () => {
        try {
            await databases.updateDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID!,
                process.env.NEXT_PUBLIC_COLLECTION_ID!,
                reel.$id,
                {
                    title: newTitle,
                }
            );

            setIsEditing(false);
            alert("Title updated!");
        } catch (error) {
            console.log(error);
        }
    };

   const handleClick=()=>{
   const video =videoRef.current;
   if(!video) return;
   video.muted=false;
   video.play().catch((err)=>{
    console.log("play err",err);
   })

   }

    return (
        <div className="h-screen w-full flex bg-black flex items-center justify-center">
            <div className="relative h-screen  w-full" >
            <video
                ref={videoRef}
                src={videoUrl.toString()}
                muted
                loop
                autoPlay
                playsInline
                className="h-full w-full object-cover"
                onClick={handleClick}
            />

            <div className="absolute bottom-10 left-5 text-white">
                {isEditing ? (
                    <>
                        <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="text-black px-2"
                        />
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 px-2 ml-2"
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <h2 className="text-xl font-bold">{reel.title}</h2>
                )}
            </div>

            {/* Right Side Buttons */}
            <div className="absolute right-5 bottom-20 flex flex-col gap-4">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-500 px-3 py-1 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-500 px-3 py-1 rounded"
                >
                    Delete
                </button>
            </div>
            </div>
        </div>
    );
}
