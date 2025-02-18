"use client";
import '@ant-design/v5-patch-for-react-19';
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState( false )
  
  const onSignOut = async ( ) => {
    setLoading( true );
    try {
      await signOut( { redirect: false } );
      toast.success( "Logout berhasil!" );
      router.push( "/auth/login" );
    } catch ( error ) {
      toast.error( "Terjadi kesalahan. Silakan coba lagi." );
    } finally {
      setTimeout( () => {
        setLoading( false );
      }, 300 );
    }
  };

  return (
    <Button danger type="primary" onClick={() => onSignOut()} disabled={loading} className="px-4 py-2 rounded">Logout</Button>
  )
}
