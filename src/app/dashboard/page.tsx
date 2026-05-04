"use client";
import Link from "next/link";
import LogoutButton from '@/components/LogoutButton';
import { BulbOutlined, RightOutlined } from '@ant-design/icons';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full animate-[spin_15s_linear_infinite]">
              <Image
                unoptimized
                src="/images/img-dragon.png"
                alt="Dragon Logo"
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Naga Dashboard</h1>
        </div>
        <LogoutButton />
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Selamat Datang! 👋</h2>
          <p className="text-gray-500 mt-1">Pilih menu di bawah ini untuk mengelola operasional Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Menu 1: Jadwal Lampu Naga */}
          <Link href="/lamp-schedule" className="block group">
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-rose-500 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                  <BulbOutlined className="text-2xl text-yellow-500" />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all">
                  <RightOutlined />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Jadwal Lampu Naga</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Kelola jadwal penyinaran lampu kebun naga. Tambah, pantau, dan atur perkiraan waktu panen dengan mudah.
              </p>
            </div>
          </Link>

          {/* Ruang untuk menu-menu lain di masa depan */}
        </div>
      </main>
    </div>
  );
}
