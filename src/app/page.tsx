import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">

      <h1 className="text-5xl font-bold mb-6">
        Welcome to Reels App 🎬
      </h1>

      <p className="mb-6 text-lg">
        Upload and Watch Short Reels
      </p>

      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-white text-black px-4 py-2 rounded"
        >
          Signup
        </Link>

        <Link
          href="/login"
          className="bg-black px-4 py-2 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
