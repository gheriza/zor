import validator from "validator";
import disposableDomains from "disposable-email-domains";
import zxcvbn from "zxcvbn";
import { supabase } from "@/lib/supabaseClient";

// Email validation
export const validateEmail = async (email: string): Promise<string> => {
  // Step 1: Validate email format
  if (!validator.isEmail(email)) {
    return "Invalid email format.";
  }

  // Step 2: Check for disposable email domains
  const domain = email.split("@")[1];
  if (disposableDomains.includes(domain)) {
    return "Disposable email addresses are not allowed.";
  }

  // Step 3: Use ZeroBounce API for advanced email validation
  const apiKey = "63e01bff5dd140e68ba4fa4725df278d"; // Ensure this is in your .env file
  try {
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`
    );
    const data = await response.json();

    if (data.status !== "valid") {
      return "Email is invalid or undeliverable.";
    }

    return ""; // No error
  } catch (error) {
    console.error("Error validating email:", error);
    return "Email validation service is currently unavailable.";
  }
};

// Password strength check
export const checkPasswordStrength = (password: string): number => {
  return zxcvbn(password).score; // Score ranges from 0 (weak) to 4 (strong)
};

// Sign-up logic
export const handleSignUp = async (
  email: string,
  password: string,
  name: string,
): Promise<{ success: boolean; error?: string }> => {
  // Step 2: Validate email
  const emailError = await validateEmail(email);
  if (emailError) {
    return { success: false, error: emailError };
  }

  // Step 3: Check password strength
  const passwordStrength = checkPasswordStrength(password);
  if (passwordStrength < 3) {
    return { success: false, error: "Password is too weak. Please choose a stronger password." };
  }

  // Step 4: Proceed with sign-up
  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (signUpError) {
      throw signUpError;
    }

    // Insert user into the `users` table
    const { error: dbError } = await supabase
      .from("users")
      .insert([{ id: data.user?.id, email, name }]);

    if (dbError) {
      throw dbError;
    }

    return { success: true };
  } catch (error) {
    console.error("Error during sign-up:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
        return { success: false, error: "An unexpected error occurred." };
    }

  }
};