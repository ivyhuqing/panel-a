// 📁 文件路径：panel-a/pages/agent/login.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AgentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push('/agent/dashboard');
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) return setError(authError.message);

    const userId = authData.user?.id;
    if (!userId) return setError('Login failed.');

    const { data: profile, error: profileError } = await supabase
      .from('agent_profile')
      .select('is_active, is_approved')
      .eq('user_id', userId)
      .single();

    if (profileError) return setError('Account not found.');
    if (!profile.is_active) return setError('Account disabled.');
    if (!profile.is_approved) return setError('Account pending approval.');

    router.push('/agent/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Agent Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-xl"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-xl"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
}

