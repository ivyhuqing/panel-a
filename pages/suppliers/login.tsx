// 📁 文件路径：panel-a/pages/supplier/login.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SupplierLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push('/supplier/dashboard');
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) return setError(authError.message);

    const userId = authData.user?.id;
    if (!userId) return setError('Login failed.');

    const { data: profile, error: profileError } = await supabase
      .from('supplier_profile')
      .select('is_active, is_approved')
      .eq('user_id', userId)
      .single();

    if (profileError) return setError('Account not found.');
    if (!profile.is_active) return setError('Account disabled.');
    if (!profile.is_approved) return setError('Account pending approval.');

    router.push('/supplier/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Supplier Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-xl"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-xl"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
}