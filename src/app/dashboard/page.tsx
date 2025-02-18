"use client";
import Link from "next/link";
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  return (
    <>
      <nav className="p-4 border-b flex justify-between">
        <h1 className="text-xl font-bold">My App</h1>
        <Link href={"/lamp-schedule"} className="underline text-blue-800 hover:text-blue-500" >Ke Jadwal</Link>
        <LogoutButton/>
      </nav>
    </>
  )
}
