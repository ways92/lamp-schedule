"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Card, Typography, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onFinish(values: any) {
    setLoading(true);
    try {
      await registerUser(values.name, values.email, values.password);
      message.success("Pendaftaran berhasil! Silakan login.");
      router.push("/login");
    } catch (err: any) {
      message.error(err.message || "Pendaftaran gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-100 text-black overflow-hidden">
      {/* Decorative Dragon Fruit themed background blobs */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-rose-400 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-pink-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white opacity-40 blur-3xl rounded-full"></div>

      <div className="w-full max-w-md px-4 z-10">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center relative overflow-hidden ring-4 ring-white/50">
             <div className="w-full h-full animate-[spin_20s_linear_infinite]">
               <img 
                 src="/images/img-dragon.png" 
                 alt="Dragon Logo" 
                 className="object-contain w-full h-full p-2" 
               />
             </div>
          </div>
        </div>

        <Card className="shadow-2xl border-none rounded-2xl overflow-hidden" styles={{ body: { padding: '32px' } }}>
          <div className="text-center mb-8">
            <Title level={2} className="m-0 !text-rose-600 font-bold tracking-tight">Daftar Akun</Title>
            <Text type="secondary" className="text-sm mt-1 block">Bergabunglah untuk kelola jadwal kebun naga</Text>
          </div>

          <Form
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Nama wajib diisi' }]}
            >
              <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Nama Lengkap" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email wajib diisi' },
                { type: 'email', message: 'Format email tidak valid' }
              ]}
            >
              <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Alamat Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Kata sandi wajib diisi' },
                { min: 6, message: 'Kata sandi minimal 6 karakter' }
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Kata Sandi" />
            </Form.Item>

            <Form.Item className="mt-6 mb-2">
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                className="bg-rose-500 hover:!bg-rose-600 border-none h-12 text-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Daftar Sekarang
              </Button>
            </Form.Item>

            <div className="text-center mt-4 pt-2 border-t border-gray-100">
              <Text type="secondary">Sudah punya akun? </Text>
              <Link href="/login" className="text-rose-500 hover:text-rose-600 font-medium transition-colors ml-1">
                Masuk di sini
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
