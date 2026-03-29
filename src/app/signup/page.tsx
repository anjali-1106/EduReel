"use client";
import { useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        await account.create("unique()", email, password);
        alert("Account Created");
        router.push("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <input className="border p-2" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} />
            <input className="border p-2" type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-500 text-white p-2"
                onClick={handleSignup}>
                Signup
            </button>
        </div>
    );
}
