import { supabase } from '@/lib/supabase';

export const signUpUser = async (formData: any) => {
  const { name, phone, birthday, gender, country, city, language, currency, email, password } = formData;

  try {
    // Sign up user with email & password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Insert user details into the `users` table
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: data.user?.id, // Automatically set the user ID
        name,
        phone,
        birthday,
        gender,
        country,
        city,
        language,
        currency,
      });

    if (userError) throw userError;

    return { success: true, message: 'User registered successfully' };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
};
