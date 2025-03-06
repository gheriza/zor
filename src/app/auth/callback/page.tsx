"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Handle the OAuth callback
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Redirect to the dashboard or home page after successful login
        router.push("/dashboard");
      } else {
        // Redirect to the login page if there's no session
        router.push("/auth/login");
      }
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
