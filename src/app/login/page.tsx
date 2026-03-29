"use client";
import { useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (loading) return;

        setLoading(true);

        try {
            await account.createEmailPasswordSession(email, password);
            router.push("/reels");
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <input className="border p-2"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" />
            <input className="border p-2" type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
            <button
                disabled={loading}
                onClick={handleLogin}
                className="bg-green-500 text-white p-2"
            >
                {loading ? "Logging..." : "Login"}
            </button>
        </div>
    );
}
