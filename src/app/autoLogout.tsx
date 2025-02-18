"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AutoLogout() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    if (!session?.expires) return;

    const currentTime = Math.floor(Date.now() / 1000);
    const sessionExpirationTime = Math.floor(new Date(session.expires).getTime() / 1000);
    const timeUntilExpiration = (sessionExpirationTime - currentTime) * 1000;

    if (timeUntilExpiration <= 0) {
      toast.dismiss();
      toast( "Sesi telah berakhir" );

      setTimeout(() => {
        signOut({callbackUrl: "/auth/login"});
        router.push( "/auth/login" );
      }, 3000);
    }

    const timeout = setTimeout(() => {
      toast.dismiss();
      toast( "Sesi telah berakhir" );

      setTimeout(() => {
        signOut({callbackUrl: "/auth/login"});
        router.push( "/auth/login" );
      }, 3000);
    }, timeUntilExpiration);

    return () => clearTimeout(timeout);

  }, [session, status, router]);

  return null;
}
