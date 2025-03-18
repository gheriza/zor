import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';
import { useForm, SubmitHandler } from 'react-hook-form';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

interface AvatarUploadProps {
  userId: string;
  onUploadSuccess: (url: string) => void;
}

interface FormData {
  avatar: FileList;
}

export default function AvatarUpload({ userId, onUploadSuccess }: AvatarUploadProps) {
  const { register, handleSubmit } = useForm<FormData>();
  const [uploading, setUploading] = useState(false);

  const onUpload: SubmitHandler<FormData> = async (data) => {
    setUploading(true);
    const file = data.avatar[0];
    const filePath = `avatars/${userId}/${file.name}`;

    const { error } = await supabase.storage.from('avatars').upload(filePath, file);

    if (error) {
      console.error('Upload failed:', error);
    } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      onUploadSuccess(data.publicUrl);
      console.log('Avatar uploaded:', data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit(onUpload)} className="space-y-4">
      <input type="file" {...register('avatar', { required: true })} />
      <Button type="submit" disabled={uploading} className="bg-primary text-white w-full">
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </form>
  );
}

