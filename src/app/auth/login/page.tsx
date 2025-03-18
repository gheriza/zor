"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { validateEmail } from "@/app/utils/authUtils";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignInSubmit = async () => {
    setIsLoading(true);
    setError("");

    if (!(await validateEmail(email) === "")) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message || "Invalid email or password.");
    } else {
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Signin Form */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="relative w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
          {/* Close Button */}
          <button
            onClick={() => router.push("/")} // Redirect to homepage or close the form
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="text-gray-600" />
          </button>

          <CardContent>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />

            <Button
              onClick={handleSignInSubmit}
              disabled={isLoading}
              className="w-full mb-4 rounded-3xl bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-sm text-center mb-4">or continue with</p>

            <Button
              onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
              className="w-full mb-4 bg-white hover:bg-gray-200 text-blue-600 rounded-3xl flex items-center justify-center"
            >
              <Image src="/icons/google.svg" alt="Google" width={16} height={16} className="mr-3" />
              Sign In with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm">
              Don&apost have an account?{" "}
              <a href="/auth/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}