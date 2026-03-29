"use client";
import { useState } from "react";
import { storage, databases } from "@/lib/appwrite";
import { ID } from "appwrite";

export default function Upload() {
    const [file, setFile] = useState<any>(null);
    const [title, setTitle] = useState("");

    const handleUpload = async () => {
        const uploaded = await storage.createFile(
            process.env.NEXT_PUBLIC_BUCKET_ID!,
            ID.unique(),
            file
        );

        await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_COLLECTION_ID!,
            ID.unique(),
            {
                title,
                videoId: uploaded.$id,
            }
        );

        alert("Reel Uploaded!");
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-10">
            <input type="text" placeholder="Title"
                onChange={(e) => setTitle(e.target.value)} />
            <input type="file"
                onChange={(e) => setFile(e.target.files?.[0])} />
            <button onClick={handleUpload}
                className="bg-purple-500 text-white p-2">
                Upload
            </button>
        </div>
    );
}
