import { supabase } from '@/lib/supabase'; 


async function fetchUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Error fetching users:", error);
    return;
  }
  console.log("Users:", data);
}

fetchUsers();
