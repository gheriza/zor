import validator from "validator";
import disposableDomains from "disposable-email-domains";
import zxcvbn from "zxcvbn";
import { supabase } from "@/lib/supabase";

// Email validation
export const validateEmail = async (email: string): Promise<string> => {
  if (!validator.isEmail(email)) {
    return "Invalid email format.";
  }

  const domain = email.split("@")[1];
  if (disposableDomains.includes(domain)) {
    return "Disposable email addresses are not allowed.";
  }

  const apiKey = "63e01bff5dd140e68ba4fa4725df278d";
  try {
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`
    );
    const data = await response.json();

    if (data.status !== "valid") {
      return "Email is invalid or undeliverable.";
    }

    return "";
  } catch (error) {
    console.error("Email Validation Error:", error);
    return "Email validation service is currently unavailable.";
  }
};

export const checkPasswordStrength = (password: string): number => {
  return zxcvbn(password).score;
};

export const handleSignUp = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  const emailError = await validateEmail(email);
  if (emailError) {
    return { success: false, error: emailError };
  }

  const passwordStrength = checkPasswordStrength(password);
  if (passwordStrength < 3) {
    return {
      success: false,
      error: "Password is too weak. Please choose a stronger password.",
    };
  }

  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/signup/signupinformations",
      },
    });

    if (signUpError) {
      throw signUpError;
    }

    const { error: dbError } = await supabase.from("users").insert([
      {
        email,
        password,
        id: data.user?.id, // Use the user ID from Supabase
      },
    ]);

    if (dbError) {
      throw dbError;
    }

    return { success: true };
  } catch (error) {
    console.error("Signup Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
};
