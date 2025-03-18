"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function UserInfoCard() {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log(data);
    const { error: dbError } = await supabase
  .from("users")
  .insert([{ 
    id: data.user?.id, // This links the user to their own data 🔥
    name: data.name, 
    phone: data.phone, 
    birthday: data.birthday, 
    country: data.country, 
    city: data.city, 
    gender: data.gender, 
    language: data.language
  }]);

    if (dbError) {
      console.error("Error:", dbError.message || dbError);
    } else {
      console.log("User added successfully");
      router.push("/dashboard");
    }
  };

  return (
    <Card className="max-w-lg w-full mx-auto shadow-xl p-6">
      <CardHeader>
        <Link href="/" className="flex items-center justify-center text-3xl text-[#4361EE] font-extrabold tracking-wide">
          Zor
        </Link>
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            placeholder="Name"
            {...register("name", { required: true })}
            className="border-blue-700 focus:border-blue-700 focus:ring-0 outline-none"
          />
          <Input
            placeholder="Phone"
            type="tel"
            {...register("phone", { required: true })}
            className="border-blue-700 focus:border-blue-700 focus:ring-0 outline-none"
          />
          <Input
            placeholder="Birthday"
            type="date"
            {...register("birthday", { required: true })}
            className="border-blue-700 focus:border-blue-700 focus:ring-0 outline-none"
          />

          <Select onValueChange={(value) => setValue("gender", value)}>
            <SelectTrigger className="border-blue-700 focus:border-blue-700 focus:ring-0 outline-none">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Country"
            {...register("country", { required: true })}
            className="border-blue-700 focus:border-blue-700 focus:ring-0 outline-none"
          />
          <Input
            placeholder="City"
            {...register("city", { required: true })}
            className="border-blue-700 focus:border-blue-700 focus:ring-0 outline-none"
          />

          <Select onValueChange={(value) => setValue("language", value)}>
            <SelectTrigger className="border-blue-700 focus:border-blue-700 focus:ring-0 outline-none">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
