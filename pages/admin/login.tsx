// 📁 文件路径：panel-a/pages/admin/login.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && user.email?.endsWith('@admin.com')) {
        router.push('/admin/users');
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else if (!email.endsWith('@admin.com')) {
      setError('Unauthorized: Not an admin account');
    } else {
      router.push('/admin/users');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="email" placeholder="Admin Email" className="w-full p-3 mb-4 border rounded-xl"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-xl"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-gray-800 hover:bg-black text-white py-2 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
}
