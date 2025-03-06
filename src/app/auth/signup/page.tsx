"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { checkPasswordStrength, handleSignUp } from "@/app/utils/authUtils";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSignUpSubmit = async () => {
    setIsLoading(true);
    setError("");

    const result = await handleSignUp(email, password, name);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "An error occurred during sign-up.");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-screen">
      <video
        autoPlay
        muted
        loop
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="relative w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
          <button
            onClick={() => router.push("/")}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="text-gray-600" />
          </button>
          <div className="text-center text-3xl text-[#4361EE] font-extrabold tracking-wide mb-4">
            Sign up
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-blue-500 rounded focus:border-blue-700 outline-none"
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handlePasswordChange(e);
              }}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-700 outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {password && (
            <div className="mb-4">
              <p>Password Strength:</p>
              <progress
                value={passwordStrength}
                max="4"
                className={`w-full ${
                  passwordStrength < 2
                    ? "bg-red-500"
                    : passwordStrength < 4
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              />
              <span className="text-sm">
                {
                  ["Very Weak", "Weak", "Good", "Strong", "Very Strong"][
                    passwordStrength
                  ]
                }
              </span>
            </div>
          )}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-700 outline-none"
          />

          <button
            onClick={handleSignUpSubmit}
            disabled={isLoading}
            className="w-full mb-4 p-2 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
          >
            {isLoading ? "Signing Up..." : "Sign Up with Email"}
          </button>
          <p className="text-sm text-center mb-4">or continue with</p>

          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
            className="w-full mb-4 p-2 rounded-3xl bg-white hover:bg-gray-200 text-blue-600 flex items-center"
            disabled={isLoading}
          >
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={16}
              height={16}
              className="mr-2"
            />
            Sign Up with Google
          </button>
          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: "facebook" })}
            className="w-full mb-4 p-2 rounded-3xl bg-white hover:bg-gray-200 text-blue-600 flex items-center"
            disabled={isLoading}
          >
            <Image
              src="/icons/facebook.svg"
              alt="Facebook"
              width={16}
              height={16}
              className="mr-2"
            />
            Sign Up with Facebook
          </button>

          <div className="flex justify-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}