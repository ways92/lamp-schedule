"use client";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const { status } = useSession();

  if (status === "loading") return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center relative min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 text-black">
      <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-gray-400 animate-bounce rounded-full shadow-[10px_10px_30px_rgba(0,0,0,0.3)]"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-400 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-300 opacity-20 blur-3xl rounded-full"></div>
      <LoginForm/>
    </div>
  );
}
